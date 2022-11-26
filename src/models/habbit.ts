export interface Habbit {
	id: number;
	name: string;
	created_at: Date;
	updated_at: Date;
}

export interface HabbitLog {
	id: number;
	habbit_id: number;
	created_at: Date;
	updated_at: Date;
}

export interface HabbitStats {
	name: string;
	value: number;
}

export interface HabbitContributions {
	[key: string]: number;
}

export interface HabbitView {
	id: number;
	habbit: Habbit;
	stats: HabbitStats[];
	contributions: Record<string, number>;
	isChecked: boolean;
	untilDate: Date;
}

export interface SingleHabitView {
	habbit: Habbit;
	stats: HabbitStats[];
}