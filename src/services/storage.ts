import type {
	Habbit,
	HabbitLog,
	HabbitContributions,
	HabbitStats,
	HabbitView,
	SingleHabitView,
} from "../models/habbit";
import moment from "moment";
import Database from "tauri-plugin-sql-api";
let db: Database;
const load = Database.load("sqlite:hw.db").then((instance) => {
	db = instance;
	return db;
});

// add a new habbit
export async function createHabbit(name: string) {
	await load;
	return db.execute("INSERT INTO habbit (name) VALUES (?)", [name]);
}

export async function getAllhabbits() {
	await load;
	return db.select("SELECT * FROM habbit", []);
}

export async function getAllhabbitsWithStats() {
	await load;
	// select habbits and their logs
	const result: HabbitView[] = [];
	const habbits: Habbit[] = await db.select("SELECT * FROM habbit", []);
	for (const habbit of habbits) {
		const yesterday = moment().toISOString();
		const logs: HabbitLog[] = await db.select(
			"SELECT * FROM habbit_log WHERE habbit_id = ?",
			[habbit.id],
		);
		// calculate stats
		const stats: HabbitStats[] = [];
		const _contributions: HabbitContributions[] = [];
		const contributions: Record<string, number> = {};

		logs.forEach((log) => {
			const date = moment(log.created_at).format("YYYY-MM-DD");
			_contributions.push({
				[date]: 1,
			});
			contributions[date] = 1;
		});

		// push completed days count
		stats.push({
			name: "Completed",
			value: logs.length,
		});
		// find the number of missing days between the habbit creation and last log
		const days =
			Math.abs(
				moment(habbit.created_at, "YYYY-MM-DD")
					.startOf("day")
					.diff(moment(yesterday, "YYYY-MM-DD").startOf("day"), "days"),
			) + 1;

		const missingDays = days - logs.length;

		stats.push({
			name: "Missed",
			value: missingDays > 0 ? missingDays : 0,
		});
		// find the current streak

		const groupeDates = Object.keys(contributions);

		stats.push({
			name: "Current Streak",
			value: currentStreak(groupeDates),
		});

		const today = moment().format("YYYY-MM-DD");

		result.push({
			id: habbit.id,
			habbit,
			stats,
			contributions,
			isChecked: contributions[today] === 1,
			untilDate: new Date(),
		});
	}

	return result;
}

export async function checkHabbit(id: number) {
	await load;
	const today = moment(new Date()).format("YYYY-MM-DD");
	const isAlreadyChecked: HabbitLog[] = await db.select(
		"SELECT * FROM habbit_log WHERE habbit_id = ? AND date(created_at) = ?",
		[id, today],
	);
	if (isAlreadyChecked.length > 0) {
		isAlreadyChecked.forEach(async (log) => {
			await db.execute("DELETE FROM habbit_log WHERE id = ?", [log.id]);
		});
		return {
			message: "You have unchecked the habit",
			confetti: false,
		};
	}
	// kinda weird but it works
	const created_at = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
	await db.execute(
		"INSERT INTO habbit_log (habbit_id, created_at) VALUES (?, ?)",
		[id, created_at],
	);
	// check all habbits completed today
	const allHabbits = await getAllhabbitsWithStats();
	const allHabbitsCompleted = allHabbits.every((habbit) => habbit.isChecked);

	return {
		message: "Awesome! You have checked the habit",
		confetti: allHabbitsCompleted,
	};
}

export async function deleteHabbit(id: number) {
	await load;
	// delete habbit and its logs
	await db.execute("DELETE FROM habbit_log WHERE habbit_id = ?", [id]);
	await db.execute("DELETE FROM habbit WHERE id = ?", [id]);
	return "Habit deleted";
}

export async function getHabitByID(id: number): Promise<SingleHabitView> {
	await load;
	const hbt: Habbit[] = await db.select("SELECT * FROM habbit WHERE id = ?", [
		id,
	]);
	if (hbt.length === 0) {
		throw new Error("Habit not found");
	}
	const habbit = hbt[0];
	const logs: HabbitLog[] = await db.select(
		"SELECT * FROM habbit_log WHERE habbit_id = ?",
		[habbit.id],
	);

	const stats: HabbitStats[] = [];

	stats.push({
		name: "Total Completed",
		value: logs.length,
		description: "Total number of times you have completed this habit",
	});

	const contributions: Record<string, number> = {};

	logs.forEach((log) => {
		const date = moment(log.created_at).format("YYYY-MM-DD");
		contributions[date] = 1;
	});

	const groupeDates = Object.keys(contributions);

	stats.push({
		name: "Longest Streak",
		value: longestStreak(groupeDates),
		description: "Longest streak of days you have completed this habit",
	});

	stats.push({
		name: "Current Streak",
		value: currentStreak(groupeDates),
		description: "Current streak of days you have completed this habit",
	});

	return {
		habbit,
		stats,
	};
}

export async function updateHabbit(id: number, name: string) {
	await load;
	await db.execute("UPDATE habbit SET name = ? WHERE id = ?", [name, id]);
	return "Habit updated";
}

const longestStreak = (dates: string[]) => {
	// sort dates
	const sortedDates = dates.sort((a, b) => {
		return moment(a).diff(moment(b));
	});
	if (sortedDates.length === 0) {
		return 0;
	}
	const lastDay = moment(sortedDates[0]);
	let count = 1;
	for (let i = 1; i < sortedDates.length; i++) {
		const currentDay = moment(sortedDates[i]);
		if (currentDay.diff(lastDay, "days") === 1) {
			count++;
		}
		lastDay.add(1, "days");
	}
	return count;
};


const currentStreak = (dates: string[]) => {
	// sort dates
	const sortedDates = dates.sort((a, b) => {
		return moment(new Date(a)).diff(moment(new Date(b)));
	}).reverse();

	let count = 0;
	let currentDay = moment()


	for (const day of sortedDates) {
		const date = moment(day)
		if (date.diff(currentDay, "days") === 0) {
			count++
		} else {
			break
		}
		currentDay.subtract(1, "days")
	}


	return count;
};
