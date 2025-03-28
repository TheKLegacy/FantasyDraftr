import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useAtom } from "jotai";
import { allBoardsAtom, cleanedPlayersAtom, currentBoardAtom } from "../Atoms";
import { initialBoard } from '../InitialData';

type DraftBoardDialogProps = {
  open: boolean;
  onClose: () => void;
};

const CreateBoardModal: React.FC<DraftBoardDialogProps> = ({ open, onClose }) => {
  const [boards, setBoards] = useAtom(allBoardsAtom);
  const [cleanedPlayers] = useAtom(cleanedPlayersAtom);
  const [_, setCurrentBoard] = useAtom(currentBoardAtom);
  const [newBoardName, setNewBoardName] = useState<string>('');

  const handleCreate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setBoards([...boards, {...initialBoard, Name:newBoardName, Players: cleanedPlayers}]);
    setCurrentBoard(newBoardName);
    setNewBoardName('');
    onClose();
  };

  const handleCancel = () => {
    setNewBoardName('');
    onClose();
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
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
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
          disabled={!newBoardName.trim()}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBoardModal;
