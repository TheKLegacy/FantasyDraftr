import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { draftPlayer, filteredPlayersAtom, draftBoard } from "../Atoms";
import {
    PlayerColumns,
    StandardPlayerGrid,
} from "../shared/Grid/StandardPlayerGrid";

export const UndraftedTable: React.FC = () => {
    const data = useAtomValue(filteredPlayersAtom(draftBoard));
    const [board, setBoard] = useAtom(draftBoard);
    const draft = useSetAtom(draftPlayer);

    const columns: PlayerColumns[] = [
        "#",
        "Rank",
        "Pos #",
        "Pos",
        "Name",
        "Team",
        "Age",
        "College",
        "Actions",
    ];
    return (
        <StandardPlayerGrid
            {...{
                columns,
                data,
                currentPlayers: board?.Players ?? [],
                board,
                setBoard,
                height: "75vh",
                width: "1080px",
            }}
        />
    );
};
