import React, { useEffect, useState, type SyntheticEvent } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Player } from "../../player";
import StatTable from "./StatTable";
import { getPlayerStats, type PlayerStatParent } from "../../Scripts/SleeperGetPlayer";
import Notes from "./Notes";

type PlayerModalProps = {
    player: Player;
    open: boolean;
    onClose: () => void;
    imageUrl: string;
};

const PlayerModal: React.FC<PlayerModalProps> = ({ player, open, onClose, imageUrl }: PlayerModalProps) => {
    const [playerStats, setPlayerStats] = useState<PlayerStatParent[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (open) {
            const fetchStats = async () => {
                setLoading(true);
                const stats = await getPlayerStats(player);
                setPlayerStats(stats);
                setLoading(false);
            };
            fetchStats();
            return;
        } 
        setPlayerStats([]);
    }, [open, player]);

    const handleImageError = (event: SyntheticEvent<HTMLImageElement, Event>) =>
        event.currentTarget.src = "https://sleepercdn.com/images/v2/icons/player_default.webp";

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="player-modal" maxWidth="md" fullWidth>
            <DialogTitle id="player-modal">
                {player.full_name}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <img
                        style={{
                            height: "128px",
                            width: "auto",
                            flex: "0 0 128px",
                            marginBottom: "16px",
                        }}
                        src={imageUrl}
                        onError={handleImageError}
                        alt={player.full_name}
                    />
                    <Notes playerId={player.player_id}/>
                </div>
                {loading ? <div>Loading stats...</div> : <StatTable rows={playerStats} position={player.position} />}
            </DialogContent>
        </Dialog>
    );
};

export default PlayerModal;
