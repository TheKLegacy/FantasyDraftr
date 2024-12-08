import { atom } from 'jotai'
import { Board, FilterValues } from './Types'
import { initialBoard } from './InitialData'

export const currentBoardAtom = atom<Board>(initialBoard);

export const currentBoardNameAtom = atom((get) => get(currentBoardAtom).Name);

export const currentFiltersAtom = atom((get) => get(currentBoardAtom).Filters);

export const currentPlayersAtom = atom((get) => get(currentBoardAtom).Players);

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

export const allBoardsAtom = atom<Board[]>([initialBoard]);