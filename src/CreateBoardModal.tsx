import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

type DraftBoardDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate?: (name: string) => void;
};

const CreateBoardModal: React.FC<DraftBoardDialogProps> = ({ open, onClose, onCreate }) => {

  const handleCreate = () => {
    //onCreate(draftBoardName.trim());
    //setDraftBoardName(''); // Clear input after creating
    onClose(); // Close dialog
  };

  const handleCancel = () => {
    //setDraftBoardName(''); // Reset the input field
    onClose(); // Close dialog
  };

  return (
    <Dialog open={open} onClose={handleCancel} aria-labelledby="draft-board-dialog-title">
      <DialogTitle id="draft-board-dialog-title">Create New Draft Board</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Draft Board Name"
          fullWidth
          //value={draftBoardName}
          //onChange={(e) => setDraftBoardName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          color="primary"
          variant="contained"
          //disabled={!draftBoardName.trim()}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBoardModal;
