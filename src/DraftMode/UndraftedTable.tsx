import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAtom, useAtomValue } from "jotai";
import { filteredPlayersAtom, draftBoardAtom } from "../Atoms";
import { PlayerColumns, StandardPlayerGrid } from "../Shared/Grid/StandardPlayerGrid";

export const UndraftedTable: React.FC = () => {
    const data = useAtomValue(filteredPlayersAtom(draftBoardAtom));
    const [board, setBoard] = useAtom(draftBoardAtom);

    const columns: PlayerColumns[] = ["#", "Rank", "Pos #", "Pos", "Name", "Team", "Age", "College", "Actions"];
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
