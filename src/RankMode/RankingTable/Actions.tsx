import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import { currentPlayersAtom, getCurrentBoard, updateBoard } from "../../Atoms";
import { useAtomValue, useSetAtom } from "jotai";

export const Actions = (props: { data: Player }) => {
    const currentPlayers = useAtomValue(currentPlayersAtom);
    const board = useAtomValue(getCurrentBoard);
    const setBoard = useSetAtom(updateBoard);
    const { data: player } = props;

    const movePlayer = (offset: number): void => {
        const updatedData = [...currentPlayers];
        const currentIndex = updatedData.findIndex(
            (p) => p.player_id === player.player_id
        );
        const newIndex = currentIndex + offset * -1;
        updatedData.splice(newIndex, 0, updatedData.splice(currentIndex, 1)[0]);
        setBoard({ ...board, Players: updatedData });
    };

    return (
        <div>
            <Tooltip title="Down 10">
                <IconButton onClick={() => movePlayer(-10)}>
                    <ExpandMoreIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Down 20">
                <IconButton onClick={() => movePlayer(-20)}>
                    <KeyboardDoubleArrowDownIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Up 10">
                <IconButton onClick={() => movePlayer(10)}>
                    <KeyboardArrowUpIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Up 20">
                <IconButton onClick={() => movePlayer(20)}>
                    <KeyboardDoubleArrowUpIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
};
