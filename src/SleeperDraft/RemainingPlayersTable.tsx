import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useAtom, useAtomValue } from "jotai";
import { filteredPlayersAtom, remainingPlayersAtom } from "../Atoms";
import { PlayerColumns, StandardPlayerGrid } from "../Shared/Grid/StandardPlayerGrid";
import { useSleeperDraft } from "../Hooks/useSleeperDraft";

export const RemainingPlayersTable: React.FC = () => {
    useSleeperDraft();
    const data = useAtomValue(filteredPlayersAtom(remainingPlayersAtom));
    const [board, setBoard] = useAtom(remainingPlayersAtom);

    const columns: PlayerColumns[] = ["#", "Rank", "Pos #", "Pos", "Name", "Team", "Age", "College"];
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
