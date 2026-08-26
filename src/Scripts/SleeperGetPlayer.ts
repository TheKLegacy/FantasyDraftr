import axios from "axios";
import type { Player } from "../player";

export type PlayerStatParent = {
    stats: Record<string, number>;
    season: string;
    week: number;
    opponent?: string;
    is_away_team?: boolean;
    date?: string;
};

export type PlayerSeasonStats = {
    season: string;
    stats: Record<string, number>;
};

type SleeperWeeklyStat = Omit<PlayerStatParent, "stats"> & {
    stats: Record<string, number>;
};

export async function getPlayerStats(player: Player, season: number): Promise<PlayerStatParent[]> {
    try {
        const { data } = await axios.get<Record<string, SleeperWeeklyStat | null>>(
            `https://api.sleeper.com/stats/nfl/player/${player.player_id}?season_type=regular&season=${season}&grouping=week`
        );

        return Object.values(data)
            .filter((weeklyStat): weeklyStat is SleeperWeeklyStat => weeklyStat !== null && !!weeklyStat.stats)
            .map((weeklyStat) => ({
                ...weeklyStat,
                season: weeklyStat.season || String(season),
            }))
            .sort((first, second) => first.week - second.week);
    } catch (error) {
        console.error(`Failed to fetch weekly stats for ${player.player_id} in ${season}:`, error);
        return [];
    }
}

export async function getPlayerSeasonStats(player: Player, season: number): Promise<PlayerSeasonStats | null> {
    try {
        const { data } = await axios.get<{ stats?: Record<string, number> } & Record<string, number>>(
            `https://api.sleeper.com/stats/nfl/player/${player.player_id}?season_type=regular&season=${season}`
        );
        const stats = data?.stats ?? data;
        if (!stats || Object.keys(stats).length === 0) return null;
        return { season: String(season), stats };
    } catch (error) {
        console.error(`Failed to fetch season stats for ${player.player_id} in ${season}:`, error);
        return null;
    }
}
