import { Player } from "../player";
import { Board } from "../Shared/Filters";
import { BoardPayload } from "../types";
import playerData from "../../data/players.json";

const playerObjects = Object.values(playerData) as unknown as Player[];

export const allocateBoards = (boards: BoardPayload[]): Board[] =>
	boards.map((b) => ({ ...b, Players: allocatePlayers(b.Players) } as Board));

const allocatePlayers = (players: string[]): Player[] =>
	players.map((p) => playerObjects.find((o) => o.player_id === p)!);
