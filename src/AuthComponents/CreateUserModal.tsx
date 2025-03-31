import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';

import { createUser } from '../Firebase/FirebaseAuth';
import { VisibilityOff, Visibility } from '@mui/icons-material';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleCreate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const user = await createUser(email, password);

    if(!user){
      setError("Failed to create user");
      setIsLoading(false);
      return;
    }

    handleCancel();
  };

  const handleCancel = () => {
    setPassword('');
    setConfirmPassword('');
    setError(null);
    setIsLoading(false);
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordInputProps = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          onClick={togglePasswordVisibility}
          edge="end"
          onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel} 
      aria-labelledby="create-user-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="create-user-dialog-title">Create an Account</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error && !email.trim()}
        />
        <TextField
          margin="dense"
          label="Password"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          slotProps={{
            input: {
              endAdornment: passwordInputProps.endAdornment
            }
          }}
          onChange={(e) => setPassword(e.target.value)}
          error={!!error && password.length < 6}
          helperText={error && password.length < 6 ? 'Password must be at least 6 characters' : ''}
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          slotProps={{
            input: {
              endAdornment: passwordInputProps.endAdornment
            }
          }}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!error && password !== confirmPassword}
          helperText={error && password !== confirmPassword ? 'Passwords do not match' : ''}
        />
      </DialogContent>
      {error && (
        <DialogContent>
          <TextField
            error
            fullWidth
            variant="standard"
            value={error}
            helperText={error}
            InputProps={{
              readOnly: true,
            }}
          />
        </DialogContent>
      )}
      <DialogActions>
        <Button 
          onClick={handleCancel} 
          color="secondary"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreate}
          color="primary"
          variant="contained"
          disabled={!email.trim() || isLoading}
        >
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserModal;