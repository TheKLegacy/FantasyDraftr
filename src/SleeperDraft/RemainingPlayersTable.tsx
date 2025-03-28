import React, { useMemo } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAtom, useAtomValue } from "jotai";
import {
    draftBoard,
    filteredPlayersAtom,
    remainingPlayers,
    teams,
} from "../Atoms";
import {
    PlayerColumns,
    StandardPlayerGrid,
} from "../shared/Grid/StandardPlayerGrid";

export const RemainingPlayersTable: React.FC = () => {
    const data = useAtomValue(filteredPlayersAtom(draftBoard));
    const [board, setBoard] = useAtom(draftBoard);

    const columns: PlayerColumns[] = [
        "#",
        "Rank",
        "Pos #",
        "Pos",
        "Name",
        "Team",
        "Age",
        "College",
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
                width: "900px",
            }}
        />
    );
};
