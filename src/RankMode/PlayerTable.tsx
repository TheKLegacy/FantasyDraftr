import React from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
    filteredPlayersAtom,
    getCurrentBoard,
    updateBoard,
    currentPlayersAtom,
} from "../Atoms";
import {
    PlayerColumns,
    StandardPlayerGrid,
} from "../shared/Grid/StandardPlayerGrid";

export const PlayerTable: React.FC = () => {
    const data = useAtomValue(filteredPlayersAtom(getCurrentBoard));
    const currentPlayers = useAtomValue(currentPlayersAtom);
    const board = useAtomValue(getCurrentBoard);
    const setBoard = useSetAtom(updateBoard);
    const columns: PlayerColumns[] = [
        "#",
        "Rank",
        "Pos #",
        "Pos",
        "Name",
        "Team",
        "Age",
        "College",
        "Grid Actions",
    ];
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
