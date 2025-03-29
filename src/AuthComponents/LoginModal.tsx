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
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { signInUser } from '../Firebase/FirebaseAuth';
import { getUserBoards } from '../Firebase/Firestore';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!email.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      await signInUser(email, password);
      console.log("Retreived user boards", getUserBoards());
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
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
      aria-labelledby="login-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="login-dialog-title">Log In</DialogTitle>
      
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
        />
        <TextField
          margin="dense"
          label="Password"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            input: {
              endAdornment: passwordInputProps.endAdornment
            }
          }}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      
      <DialogActions>
        <Button 
          onClick={handleCancel} 
          color="secondary"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSignIn}
          color="primary"
          variant="contained"
          disabled={!email.trim() || isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;