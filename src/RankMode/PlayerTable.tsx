import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { filteredPlayersAtom, getCurrentBoardAtom, updateBoardAction, currentPlayersAtom } from "../Atoms";
import { PlayerColumns, StandardPlayerGrid } from "../Shared/Grid/StandardPlayerGrid";

export const PlayerTable: React.FC = () => {
    const data = useAtomValue(filteredPlayersAtom(getCurrentBoardAtom));
    const currentPlayers = useAtomValue(currentPlayersAtom);
    const board = useAtomValue(getCurrentBoardAtom);
    const setBoard = useSetAtom(updateBoardAction);
    const columns: PlayerColumns[] = ["#", "Rank", "Pos #", "Pos", "Name", "Team", "Age", "College", "Grid Actions"];
    return (
        <StandardPlayerGrid
            {...{
                columns,
                data,
                currentPlayers,
                board,
                setBoard,
                height: "75vh",
                width: "1080px",
            }}
        />
    );
};
