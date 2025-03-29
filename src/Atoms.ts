import { type Atom, atom } from "jotai";
import { initialBoard } from "./InitialData";
import { atomFamily, atomWithStorage } from "jotai/utils";
import type { Board, FilterValues } from "./Shared/Filters";
import type { Player } from "./player";
import type { DraftedBoard, SleeperDraft, SleeperPick } from "./types";
import { filterPlayers } from "./Shared/utils";

export const currentBoardAtom = atom<String>("Unnamed Board");

export const displayModeAtom = atom<"rank" | "draft" | "livedraft">("rank");

export const remainingPlayersAtom = atom<Board | undefined>(undefined);

export const draftBoardAtom = atom<Board | undefined>(undefined);
export const draftedBoardAtom = atom<DraftedBoard>({Players: [], Pick: 0});

export const teamsAtom = atom<number>(12);

export const sleeperDraftIdAtom = atom<string>('');
export const sleeperDraftAtom = atom<SleeperDraft | null>(null);
export const sleeperPicksAtom = atom<SleeperPick[]>([]);

export const draftPlayerAction = atom(null, (get, set, payload: Player) => {
    let board = get(draftBoardAtom);
    let draftedPlayersBoard = get(draftedBoardAtom);
    const updatedPlayers = board!.Players.filter(p => p.player_id !== payload.player_id);
    const updatedDraftedPlayers = [...draftedPlayersBoard.Players, { ...payload, Pick: draftedPlayersBoard.Pick + 1 }];
    set(draftBoardAtom, { ...board!, Players: updatedPlayers });
    set(draftedBoardAtom, { Players: updatedDraftedPlayers, Pick: draftedPlayersBoard.Pick + 1 });
})

export const getCurrentBoardAtom = atom((get) => {
    const name = get(currentBoardAtom);
    const board = get(allBoardsAtom);
    return board.find(b => b.Name === name) ?? {...initialBoard } ;
})

export const updateBoardAction = atom(null, (get, set, payload: Board) => {
    const allBoards = get(allBoardsAtom);
    const updatedBoards = allBoards.map((board) =>
        board.Name === payload.Name ? payload : board
    );
    set(allBoardsAtom, updatedBoards);
});

export const updateBoardNameAction = atom(null, (get, set, payload: Board & {NewName: string}) => {
    const allBoards = get(allBoardsAtom);
    const updatedBoards = allBoards.map((board) =>
        board.Name === payload.Name ? { ...payload, Name: payload.NewName, NewName: undefined } as Board : board
    );

    set(currentBoardAtom, payload.NewName);
    set(allBoardsAtom, updatedBoards);
});

export const deleteCurrentBoardAction = atom(null, (get, set) => {
    const allBoards = get(allBoardsAtom);
    const currentBoard = get(currentBoardAtom);
    const updatedBoards = allBoards.filter((board) => board.Name !== currentBoard);
    set(allBoardsAtom, updatedBoards);
    set(currentBoardAtom, updatedBoards[0]?.Name ?? "");
});

export const currentFiltersAtom = atom((get) => get(getCurrentBoardAtom).Filters);
export const currentPlayersAtom = atom((get) => get(getCurrentBoardAtom).Players);

export const filteredPlayersAtom = atomFamily(
    (boardAtom: Atom<Board | undefined>) =>
      atom((get) => {
        const board = get(boardAtom);
        return board ? filterPlayers(board.Players, board.Filters) : [];
      })
  );

export const allBoardsAtom = atomWithStorage<Board[]>("DraftBoards", [initialBoard]);

export const cleanedPlayersAtom = atom<Player[]>([]);