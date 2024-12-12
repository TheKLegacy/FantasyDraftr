import { atom } from 'jotai'
import { Board, FilterValues } from './Types'
import { initialBoard } from './InitialData'
import { atomWithStorage } from 'jotai/utils'

export const currentBoardAtom = atom<String>("Unnamed Board");

export const getCurrentBoard = atom((get) => {
    const name = get(currentBoardAtom);
    const board = get(allBoardsAtom);
    return board.find(b => b.Name === name) ?? {...initialBoard } ;
})

export const updateBoard = atom(null, (get, set, payload: Board) => {
    const allBoards = get(allBoardsAtom);
    const updatedBoards = allBoards.map((board) =>
        board.Name === payload.Name ? payload : board
    );
    set(allBoardsAtom, updatedBoards);
});

export const updateBoardName = atom(null, (get, set, payload: Board & {NewName: string}) => {
    console.log("payload", payload)
    const allBoards = get(allBoardsAtom);
    const updatedBoards = allBoards.map((board) =>
        board.Name === payload.Name ? { ...payload, Name: payload.NewName, NewName: undefined } as Board : board
    );

    set(currentBoardAtom, payload.NewName);
    set(allBoardsAtom, updatedBoards);
});

export const currentFiltersAtom = atom((get) => get(getCurrentBoard).Filters);

export const currentPlayersAtom = atom((get) => get(getCurrentBoard).Players);

export const filteredPlayersAtom = atom((get) => { 
    const players = get(currentPlayersAtom);
    const filters = get(currentFiltersAtom);

    const filterPlayers = (players: Player[], filters: FilterValues): Player[] => {
        return players.filter(player => {
            // Check if the player's type matches the filter
            if (filters[player.position]) return true;
    
            // Special case: IDP is a combination of DL, LB, and DB
            if (
                filters.IDP &&
                (player.position === "DL" || player.position === "LB" || player.position === "DB")
            ) {
                return true;
            }
    
            return false; // Otherwise, exclude the player
        });
    };

    return filterPlayers(players, filters);
});

export const allBoardsAtom = atomWithStorage<Board[]>("DraftBoards", [initialBoard]);

export const cleanedPlayersAtom = atom<Player[]>([]);