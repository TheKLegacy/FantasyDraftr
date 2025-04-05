import React, { useState, KeyboardEvent } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { signInUser } from "../Firebase/FirebaseAuth";
import { getUserBoards } from "../Firebase/Firestore";
import { allocateBoards } from "../Scripts/AllocatePlayersToBoards";
import { useSetAtom } from "jotai";
import { allBoardsAtom, currentBoardAtom, userAtom } from "../Atoms";

type LoginModalProps = {
    open: boolean;
    onClose: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const setAllBoard = useSetAtom(allBoardsAtom);
    const setCurrentBoard = useSetAtom(currentBoardAtom);
    const setUser = useSetAtom(userAtom);

    const handleSignIn = async () => {
        if (!email.trim()) return;

        setIsLoading(true);
        setError(null);
        const user = await signInUser(email, password);
        setIsLoading(false);
        if (!user) {
            setError("Invalid Login");
            return;
        }
        setUser(user);
        const userBoards = await getUserBoards();
        if ((userBoards?.length ?? 0 > 0) && !!userBoards?.[0]) {
            setAllBoard(allocateBoards(userBoards));
            setCurrentBoard(userBoards[0].Name);
        }
        onClose();
    };

    const handleCancel = () => {
        setError(null);
        setPassword("");
        onClose();
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && email.trim() && !isLoading) {
            e.preventDefault();
            handleSignIn();
        }
    };

    const passwordInputProps = {
        endAdornment: (
            <InputAdornment position="end">
                <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
        <Dialog open={open} onClose={handleCancel} aria-labelledby="login-dialog-title" maxWidth="xs" fullWidth>
            <DialogTitle id="login-dialog-title">Log In</DialogTitle>

            <DialogContent onKeyDown={handleKeyDown}>
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
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    slotProps={{
                        input: {
                            endAdornment: passwordInputProps.endAdornment,
                        },
                    }}
                    error={!!error}
                    helperText={error}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCancel} color="secondary" disabled={isLoading}>
                    Cancel
                </Button>
                <Button
                    onClick={() => handleSignIn()}
                    color="primary"
                    variant="contained"
                    disabled={!email.trim() || isLoading}
                >
                    {isLoading ? "Signing In..." : "Sign In"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginModal;
