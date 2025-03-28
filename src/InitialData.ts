import { Board } from "./Filters";

export const initialBoard: Board = {
    Name: 'Unnamed Board', 
    Filters: {
        QB: true,
        RB: true,
        WR: true,
        TE: true,
        "Rookies Only": false,
        RookiePicks: true,
    },
    Players: []
}