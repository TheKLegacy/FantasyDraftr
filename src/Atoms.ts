import { type Atom, atom } from "jotai";
import { initialBoard } from "./InitialData";
import { atomFamily, atomWithStorage } from "jotai/utils";
import type { Board, FilterValues } from "./Filters";
import type { Player } from "./player";
import type { DraftedBoard } from "./Types";
import { writeUserBoards } from "./Firebase/Firestore";

export const currentBoardAtom = atom<String>("Unnamed Board");

export const displayMode = atom<"rank" | "draft" | "livedraft">("rank");

export const remainingPlayers = atom<Board | undefined>(undefined);

export const draftBoard = atom<Board | undefined>(undefined);
export const draftedBoard = atom<DraftedBoard>({ Players: [], Pick: 0 });

export const teams = atom<number>(12);

export const draftPlayer = atom(null, (get, set, payload: Player) => {
	let board = get(draftBoard);
	let draftedPlayersBoard = get(draftedBoard);
	const updatedPlayers = board!.Players.filter(
		(p) => p.player_id !== payload.player_id
	);
	const updatedDraftedPlayers = [
		...draftedPlayersBoard.Players,
		{ ...payload, Pick: draftedPlayersBoard.Pick + 1 },
	];
	set(draftBoard, { ...board!, Players: updatedPlayers });
	set(draftedBoard, {
		Players: updatedDraftedPlayers,
		Pick: draftedPlayersBoard.Pick + 1,
	});
});

export const getCurrentBoard = atom((get) => {
	const name = get(currentBoardAtom);
	const board = get(allBoardsAtom);
	return board.find((b) => b.Name === name) ?? { ...initialBoard };
});

export const updateBoard = atom(null, (get, set, payload: Board) => {
	const allBoards = get(allBoardsAtom);
	const updatedBoards = allBoards.map((board) =>
		board.Name === payload.Name ? payload : board
	);
	writeUserBoards(updatedBoards);
	set(allBoardsAtom, updatedBoards);
});

export const updateBoardName = atom(
	null,
	(get, set, payload: Board & { NewName: string }) => {
		const allBoards = get(allBoardsAtom);
		const updatedBoards = allBoards.map((board) =>
			board.Name === payload.Name
				? ({
						...payload,
						Name: payload.NewName,
						NewName: undefined,
				  } as Board)
				: board
		);

		set(currentBoardAtom, payload.NewName);
		set(allBoardsAtom, updatedBoards);
	}
);

export const deleteCurrentBoard = atom(null, (get, set) => {
	const allBoards = get(allBoardsAtom);
	const currentBoard = get(currentBoardAtom);
	const updatedBoards = allBoards.filter(
		(board) => board.Name !== currentBoard
	);
	set(allBoardsAtom, updatedBoards);
	set(currentBoardAtom, updatedBoards[0]?.Name ?? "");
});

export const currentFiltersAtom = atom((get) => get(getCurrentBoard).Filters);
export const currentPlayersAtom = atom((get) => get(getCurrentBoard).Players);

export const filteredPlayersAtom = atomFamily(
	(boardAtom: Atom<Board | undefined>) =>
		atom((get) => {
			const board = get(boardAtom);
			return board ? filterPlayers(board.Players, board.Filters) : [];
		})
);

const filterPlayers = (players: Player[], filters: FilterValues): Player[] => {
	let qbRanking = 0,
		rbRanking = 0,
		wrRanking = 0,
		teRanking = 0,
		dlRanking = 0,
		lbRanking = 0,
		dbRanking = 0;
	return players.filter((player) => {
		const positionMatches = filters[player.position];

		if (filters["Rookies Only"] && player.years_exp !== 0) {
			return false;
		}

		if (positionMatches) {
			switch (player.position.toUpperCase()) {
				case "QB":
					player.posRank = ++qbRanking;
					break;
				case "RB":
					player.posRank = ++rbRanking;
					break;
				case "WR":
					player.posRank = ++wrRanking;
					break;
				case "TE":
					player.posRank = ++teRanking;
					break;
			}
			return true;
		}
		return false;
	});
};

export const allBoardsAtom = atomWithStorage<Board[]>("DraftBoards", [
	initialBoard,
]);

export const cleanedPlayersAtom = atom<Player[]>([]);
