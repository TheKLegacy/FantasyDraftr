import type { Player } from "../player";
import type { Board } from "../Shared/Filters";
import type { BoardPayload } from "../Types";
import playerData from "../../data/players.json";

const playerObjects = Object.values(playerData) as unknown as Player[];

export const allocateBoards = (boards: BoardPayload[]): Board[] =>
    boards.map((b) => ({ ...b, Players: allocatePlayers(b.Players) } as Board));

const allocatePlayers = (players: string[]): Player[] =>
    players.map((p) => playerObjects.find((o) => o.player_id === p)!).filter((p) => !!p);
