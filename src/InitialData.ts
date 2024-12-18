import { Board } from "./Types";

export const initialBoard = {
    Name: 'Unnamed Board', 
    Filters: {
        QB: true,
        RB: true,
        WR: true,
        TE: true,
        K: true,
        DEF: true,
        RookiePicks: true,
        IDP: true,
        DL: true,
        LB: true,
        DB: true,
    },
    Players: []
} as Board