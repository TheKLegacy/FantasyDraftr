import axios from "axios";
import type { Player } from "../player";

export type PlayerStatParent = {
    stats: Record<string, number>;
    season: string;
};

const sleeperApiStatsCall = (playerId: string, year: number): string =>
    `https://api.sleeper.com/stats/nfl/player/${playerId}?season_type=regular&season=${year}`;

const getRecentYears = (n: number): number[] => Array.from({ length: n }, (_, i) => new Date().getFullYear() - i);

async function fetchPlayerStats(playerId: string, year: number): Promise<PlayerStatParent | null> {
    try {
        const { data } = await axios.get(sleeperApiStatsCall(playerId, year));
        return data as PlayerStatParent;
    } catch (error) {
        console.error(`Failed to fetch stats for ${playerId} in ${year}:`, error);
        return null;
    }
}

export async function getPlayerStats(player: Player): Promise<PlayerStatParent[]> {
    const yearsToPull = getRecentYears(player.years_exp + 1);
    const stats = await Promise.all(yearsToPull.map((year) => fetchPlayerStats(player.player_id, year)));
    return stats.filter((s): s is PlayerStatParent => s !== null);
}
