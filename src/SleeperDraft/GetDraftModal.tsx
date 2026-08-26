import React, { useState } from "react";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { displayModeAtom, getCurrentBoardAtom, remainingPlayersAtom, sleeperDraftIdAtom, sleeperUserAtom } from "../Atoms";
import type { SleeperLeague, SleeperUser } from "../Types";

type DraftBoardDialogProps = {
    open: boolean;
    onClose: () => void;
};

const GetDraftModal: React.FC<DraftBoardDialogProps> = ({ open, onClose }) => {
    const [sleeperDraftId, setSleeperDraftId] = useAtom(sleeperDraftIdAtom);
    const [sleeperUser, setSleeperUser] = useAtom(sleeperUserAtom);
    const setDisplayMode = useSetAtom(displayModeAtom);
    const setRemainingPlayers = useSetAtom(remainingPlayersAtom);
    const currentBoard = useAtomValue(getCurrentBoardAtom);
    const [season, setSeason] = useState(String(new Date().getFullYear()));
    const [leagues, setLeagues] = useState<SleeperLeague[]>([]);
    const [isLoadingLeagues, setIsLoadingLeagues] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const findLeagues = async () => {
        if (!sleeperUser.trim() || !season.trim()) return;

        try {
            setError(null);
            setIsLoadingLeagues(true);
            const { data: user } = await axios.get<SleeperUser>(
                `https://api.sleeper.app/v1/user/${encodeURIComponent(sleeperUser.trim())}`
            );
            const { data: userLeagues } = await axios.get<SleeperLeague[]>(
                `https://api.sleeper.app/v1/user/${user.user_id}/leagues/nfl/${encodeURIComponent(season.trim())}`
            );
            setLeagues(userLeagues);
            setSleeperDraftId(userLeagues[0]?.draft_id ?? "");
            if (userLeagues.length === 0) setError("No leagues found for that user and season.");
        } catch (err) {
            setLeagues([]);
            setSleeperDraftId("");
            setError(err instanceof Error ? err.message : "Unable to find Sleeper leagues.");
        } finally {
            setIsLoadingLeagues(false);
        }
    };

    const handleCreate = () => {
        setDisplayMode("livedraft");
        setRemainingPlayers(currentBoard);
        onClose();
    };

    const handleCancel = () => {
        setSleeperDraftId("");
        setLeagues([]);
        setError(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleCancel} aria-labelledby="draft-board-dialog-title">
            <DialogTitle id="draft-board-dialog-title">Provide a sleeper draft ID</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Draft ID"
                    fullWidth
                    value={sleeperDraftId}
                    onChange={(e) => setSleeperDraftId(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Sleeper Username"
                    fullWidth
                    value={sleeperUser}
                    onChange={(e) => setSleeperUser(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Season"
                    fullWidth
                    value={season}
                    onChange={(e) => setSeason(e.target.value)}
                />
                <Button onClick={findLeagues} disabled={!sleeperUser.trim() || !season.trim() || isLoadingLeagues}>
                    {isLoadingLeagues ? "Finding leagues..." : "Find leagues"}
                </Button>
                {leagues.length > 0 && (
                    <TextField
                        select
                        margin="dense"
                        label="League"
                        fullWidth
                        value={sleeperDraftId}
                        onChange={(e) => setSleeperDraftId(e.target.value)}
                    >
                        {leagues.map((league) => (
                            <MenuItem key={league.league_id} value={league.draft_id}>
                                {league.name} ({league.status})
                            </MenuItem>
                        ))}
                    </TextField>
                )}
                {error && <Alert severity="error">{error}</Alert>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleCreate} color="primary" variant="contained" disabled={!sleeperDraftId.trim()}>
                    Join
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GetDraftModal;
