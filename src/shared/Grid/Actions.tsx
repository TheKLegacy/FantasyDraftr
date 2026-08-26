import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import InputIcon from "@mui/icons-material/Input";
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Tooltip, IconButton } from "@mui/material";
import { currentPlayersAtom, getCurrentBoardAtom, updateBoardAction } from "../../Atoms";
import { useAtomValue, useSetAtom } from "jotai";
import type { Player } from "../../player";

export const Actions = (props: { data: Player }) => {
    const currentPlayers = useAtomValue(currentPlayersAtom);
    const board = useAtomValue(getCurrentBoardAtom);
    const setBoard = useSetAtom(updateBoardAction);
    const { data: player } = props;
    const [targetPosition, setTargetPosition] = React.useState("");
    const [isPositionDialogOpen, setIsPositionDialogOpen] = React.useState(false);

    const movePlayer = (offset: number): void => {
        const updatedData = [...currentPlayers];
        const currentIndex = updatedData.findIndex((p) => p.player_id === player.player_id);
        if (currentIndex < 0) return;
        const [selectedPlayer] = updatedData.splice(currentIndex, 1);
        const newIndex = Math.max(0, Math.min(updatedData.length, currentIndex + offset * -1));
        updatedData.splice(newIndex, 0, selectedPlayer);
        setBoard({ ...board, Players: updatedData });
    };

    const moveToPosition = () => {
        const requestedPosition = Number.parseInt(targetPosition, 10);
        if (!Number.isInteger(requestedPosition)) return;

        const currentIndex = currentPlayers.findIndex((p) => p.player_id === player.player_id);
        if (currentIndex < 0) return;

        const updatedData = [...currentPlayers];
        const [selectedPlayer] = updatedData.splice(currentIndex, 1);
        const targetIndex = Math.max(0, Math.min(updatedData.length, requestedPosition - 1));
        updatedData.splice(targetIndex, 0, selectedPlayer);
        setBoard({ ...board, Players: updatedData });
        setTargetPosition("");
        setIsPositionDialogOpen(false);
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
            <Tooltip title="Move to position">
                <IconButton onClick={() => setIsPositionDialogOpen(true)}>
                    <InputIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={isPositionDialogOpen} onClose={() => setIsPositionDialogOpen(false)}>
                <DialogTitle>Move player to position</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        type="number"
                        margin="dense"
                        label="Overall position"
                        fullWidth
                        inputProps={{ min: 1, max: currentPlayers.length }}
                        value={targetPosition}
                        onChange={(event) => setTargetPosition(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsPositionDialogOpen(false)}>Cancel</Button>
                    <Button onClick={moveToPosition} variant="contained" disabled={!targetPosition.trim()}>
                        Move
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
