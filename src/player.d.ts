import { FilterTypes } from "./Shared/Filters";

type Player = {
	player_id: string;
	full_name: string;
	height: string;
	college: string;
	number: number;
	active: boolean;
	injury_status: string | null;
	status: string;
	depth_chart_position: string | null;
	injury_notes: string | null;
	first_name: string;
	years_exp: number;
	last_name: string;
	position: positions;
	weight: string;
	age: number;
	depth_chart_order: number | null;
	fantasy_positions: string[];
	team: string | null;
	rank: number | null;
	posRank: number | null;
	[key: string]: any;
};

type positions = Exclude<FilterTypes, "Rookies Only">;

type PlayerDrafted = Player & { Pick: number };
