import type {
	Habbit,
	HabbitLog,
	HabbitContributions,
	HabbitStats,
	HabbitView,
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
		let currentStreak = 0;
		let lastLogDate = moment();
		for (const log of logs) {
			const logDate = moment(log.created_at);
			const diff = logDate.diff(lastLogDate, "days");
			if (diff > 1) {
				break;
			}
			currentStreak++;
			lastLogDate = logDate;
		}
		stats.push({
			name: "Current Streak",
			value: currentStreak,
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
		}
	}
	// kinda weird but it works
	const created_at = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
	await db.execute(
		"INSERT INTO habbit_log (habbit_id, created_at) VALUES (?, ?)",
		[id, created_at],
	);
	// check all habbits completed today 
	const allHabbits = await getAllhabbitsWithStats();
	const allHabbitsCompleted = allHabbits.every(habbit => habbit.isChecked);
	


	return {
		message: "Awesome! You have checked the habit",
		confetti: allHabbitsCompleted,
	}
}

export async function deleteHabbit(id: number) {
	await load;
	// delete habbit and its logs
	await db.execute("DELETE FROM habbit_log WHERE habbit_id = ?", [id]);
	await db.execute("DELETE FROM habbit WHERE id = ?", [id]);
	return "Habit deleted";
}

export async function updateHabbit(id: number, name: string) {
	await load;
	await db.execute("UPDATE habbit SET name = ? WHERE id = ?", [name, id]);
	return "Habit updated";
}
