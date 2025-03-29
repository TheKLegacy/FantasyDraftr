import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { deleteCurrentBoardAction } from "../Atoms";
import { useSetAtom } from "jotai";

type DeleteModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
    open,
    onClose,
    title = "Confirm Deletion",
    description = "Are you sure you want to delete this item? This action cannot be undone.",
}) => {
    const deleteBoard = useSetAtom(deleteCurrentBoardAction);

    const onDelete = () => {
        deleteBoard();
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-modal-title"
        >
            <DialogTitle id="delete-modal-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={onDelete} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteModal;
