import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { displayModeAtom, getCurrentBoardAtom, remainingPlayersAtom, sleeperDraftIdAtom } from "../Atoms";

type DraftBoardDialogProps = {
    open: boolean;
    onClose: () => void;
};

const GetDraftModal: React.FC<DraftBoardDialogProps> = ({ open, onClose }) => {
    const [sleeperDraftId, setSleeperDraftId] = useAtom(sleeperDraftIdAtom);
    const setDisplayMode = useSetAtom(displayModeAtom);
    const setRemainingPlayers = useSetAtom(remainingPlayersAtom);
    const currentBoard = useAtomValue(getCurrentBoardAtom);

    const handleCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setDisplayMode("livedraft");
        setRemainingPlayers(currentBoard);
        onClose();
    };

    const handleCancel = () => {
        setSleeperDraftId("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel} aria-labelledby="draft-board-dialog-title">
            <DialogTitle id="draft-board-dialog-title">Provide a sleeper draft ID</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Draft Board Name"
                    fullWidth
                    value={sleeperDraftId}
                    onChange={(e) => setSleeperDraftId(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleCreate} color="primary" variant="contained" disabled={!sleeperDraftId.trim()}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GetDraftModal;
