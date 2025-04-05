import { Board } from "./Shared/Filters";

export const initialBoard: Board = {
    Name: "Unnamed Board",
    Filters: {
        QB: true,
        RB: true,
        WR: true,
        TE: true,
        "Rookies Only": false,
    },
    Players: [],
};
