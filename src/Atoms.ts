import { type Atom, atom } from "jotai";
import { initialBoard } from "./InitialData";
import { atomFamily, atomWithStorage } from "jotai/utils";
import type { Board } from "./Shared/Filters";
import type { Player } from "./player";
import type { DraftedBoard, PlayerNote, SleeperDraft, SleeperPick } from "./Types";
import { writeUserBoards } from "./Firebase/Firestore";
import { filterPlayers } from "./Shared/utils";
import type { User } from "firebase/auth";

export const currentBoardAtom = atom<String>("Unnamed Board");

export const displayModeAtom = atom<"rank" | "draft" | "livedraft">("rank");

export const remainingPlayersAtom = atom<Board | undefined>(undefined);

export const draftBoardAtom = atom<Board | undefined>(undefined);
export const draftedBoardAtom = atom<DraftedBoard>({ Players: [], Pick: 0 });

export const teamsAtom = atom<number>(12);

export const sleeperUserAtom = atom<string>("");
export const sleeperDraftIdAtom = atom<string>("");
export const sleeperDraftAtom = atom<SleeperDraft | null>(null);
export const sleeperPicksAtom = atom<SleeperPick[]>([]);
export const sleeperPlayerPicksAtom = atom<number[]>();

export const draftPlayerAction = atom(null, (get, set, payload: Player) => {
    const board = get(draftBoardAtom);
    const draftedPlayersBoard = get(draftedBoardAtom);
    const updatedPlayers = board!.Players.filter((p) => p.player_id !== payload.player_id);
    const updatedDraftedPlayers = [...draftedPlayersBoard.Players, { ...payload, Pick: draftedPlayersBoard.Pick + 1 }];
    set(draftBoardAtom, { ...board!, Players: updatedPlayers });
    set(draftedBoardAtom, {
        Players: updatedDraftedPlayers,
        Pick: draftedPlayersBoard.Pick + 1,
    });
});

export const getCurrentBoardAtom = atom((get) => {
    const name = get(currentBoardAtom);
    const board = get(allBoardsAtom);
    return board.find((b) => b.Name === name) ?? { ...initialBoard };
});

export const updateBoardAction = atom(null, (get, set, payload: Board) => {
    const allBoards = get(allBoardsAtom);
    const updatedBoards = allBoards.map((board) => (board.Name === payload.Name ? payload : board));
    writeUserBoards(updatedBoards);
    set(allBoardsAtom, updatedBoards);
});

export const updateBoardNameAction = atom(null, (get, set, payload: Board & { NewName: string }) => {
    const allBoards = get(allBoardsAtom);
    const updatedBoards = allBoards.map((board) =>
        board.Name === payload.Name
            ? ({
                  ...payload,
                  Name: payload.NewName,
              } as Board)
            : board
    );

    set(currentBoardAtom, payload.NewName);
    writeUserBoards(updatedBoards);
    set(allBoardsAtom, updatedBoards);
});

export const deleteCurrentBoardAction = atom(null, (get, set) => {
    const allBoards = get(allBoardsAtom);
    const currentBoard = get(currentBoardAtom);
    const updatedBoards = allBoards.filter((board) => board.Name !== currentBoard);
    writeUserBoards(updatedBoards);
    set(allBoardsAtom, updatedBoards);
    set(currentBoardAtom, updatedBoards[0]?.Name ?? "");
});

export const currentFiltersAtom = atom((get) => get(getCurrentBoardAtom).Filters);
export const currentPlayersAtom = atom((get) => get(getCurrentBoardAtom).Players);

export const filteredPlayersAtom = atomFamily((boardAtom: Atom<Board | undefined>) =>
    atom((get) => {
        const board = get(boardAtom);
        return board ? filterPlayers(board.Players, board.Filters) : [];
    })
);

export const allBoardsStorageAtom = atomWithStorage<Board[]>("DraftBoards", [initialBoard]);

export const userAtom = atom<User>();

export const allBoardsUserAtom = atom<Board[]>([]);

export const allBoardsAtom = atom(
    (get) => {
        const user = get(userAtom);
        return user ? get(allBoardsUserAtom) : get(allBoardsStorageAtom);
    },
    (get, set, newValue: Board[]) => {
        const user = get(userAtom);
        if (user) {
            set(allBoardsUserAtom, newValue);
        } else {
            set(allBoardsStorageAtom, newValue);
        }
    }
);

export const cleanedPlayersAtom = atom<Player[]>([]);

export const playerNotes = atomWithStorage<PlayerNote[]>("playerNotes",[], undefined, { getOnInit: true });