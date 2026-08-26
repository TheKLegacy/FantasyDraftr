import type { Player } from "../player";
import type { Board } from "../Shared/Filters";
import type { BoardPayload } from "../Types";
import playerData from "../../data/players.json";

const playerObjects = Object.values(playerData) as unknown as Player[];
const playerById = new Map(playerObjects.map((player) => [player.player_id, player]));

export const allocateBoards = (boards: Array<BoardPayload | Board>): Board[] =>
    boards.map((b) => ({ ...b, Players: allocatePlayers(b.Players) } as Board));

const allocatePlayers = (players: string[] | Player[]): Player[] => {
    const storedIds = players.map((player) => (typeof player === "string" ? player : player.player_id));
    const storedIdSet = new Set(storedIds);
    const reconciledIds = [
        ...storedIds.filter((playerId) => playerById.has(playerId)),
        ...playerObjects.map((player) => player.player_id).filter((playerId) => !storedIdSet.has(playerId)),
    ];

    return reconciledIds.map((playerId) => playerById.get(playerId)!);
};
