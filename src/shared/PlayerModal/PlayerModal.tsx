import React, { useEffect, useState, type SyntheticEvent } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Tab, Tabs, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Player } from "../../player";
import StatTable from "./StatTable";
import { getPlayerSeasonStats, getPlayerStats, type PlayerSeasonStats, type PlayerStatParent } from "../../Scripts/SleeperGetPlayer";
import Notes from "./Notes";
import SeasonTotalsTable from "./SeasonTotalsTable";

type PlayerModalProps = {
    player: Player;
    open: boolean;
    onClose: () => void;
    imageUrl: string;
};

const PlayerModal: React.FC<PlayerModalProps> = ({ player, open, onClose, imageUrl }: PlayerModalProps) => {
    const years = Array.from({ length: Math.min(player.years_exp + 1, 15) }, (_, index) => 2025 - index);
    const [selectedYear, setSelectedYear] = useState(years[0]);
    const [statsByYear, setStatsByYear] = useState<Record<number, PlayerStatParent[]>>({});
    const [totalsByYear, setTotalsByYear] = useState<Record<number, PlayerSeasonStats | null>>({});
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setSelectedYear(years[0]);
        setStatsByYear({});
        setTotalsByYear({});
    }, [player.player_id]);

    useEffect(() => {
        if (!open) {
            setStatsByYear({});
            setTotalsByYear({});
            return;
        }

        const fetchSeasonTotals = async () => {
            setLoading(true);
            const totals = await Promise.all(years.map((year) => getPlayerSeasonStats(player, year)));
            setTotalsByYear(
                Object.fromEntries(
                    totals
                        .filter((total): total is PlayerSeasonStats => total !== null)
                        .map((total) => [Number(total.season), total])
                )
            );
            setLoading(false);
        };

        fetchSeasonTotals();
    }, [open, player.player_id]);

    useEffect(() => {
        if (!open || statsByYear[selectedYear]) return;

        const fetchWeeklyStats = async () => {
            setLoading(true);
            const stats = await getPlayerStats(player, selectedYear);
            setStatsByYear((previous) => ({ ...previous, [selectedYear]: stats }));
            setLoading(false);
        };

        fetchWeeklyStats();
    }, [open, player.player_id, selectedYear, statsByYear]);

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
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Season Totals</Typography>
                <SeasonTotalsTable
                    rows={years.map((year) => totalsByYear[year]).filter((row): row is PlayerSeasonStats => row !== null && row !== undefined)}
                    position={player.position}
                />
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Weekly Stats</Typography>
                <Tabs value={selectedYear} onChange={(_, year) => setSelectedYear(year)} variant="scrollable">
                    {years.map((year) => <Tab key={year} value={year} label={year} />)}
                </Tabs>
                {loading ? <div>Loading stats...</div> : <StatTable rows={statsByYear[selectedYear] ?? []} position={player.position} />}
            </DialogContent>
        </Dialog>
    );
};

export default PlayerModal;
