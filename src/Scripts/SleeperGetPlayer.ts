import axios from "axios";
import { Player } from "../player";

export type PlayerStatParent = {
  date: null;
  stats: Record<string, number>;
  category: string;
  last_modified: number;
  week: null;
  season: string;
  season_type: string;
  sport: string;
  player_id: string;
  game_id: string;
  updated_at: number;
  team: string;
  company: string;
  opponent: null;
  player: Player;
};

const sleeperApiStatsCall = (playerId: string, year: number): string =>
  `https://api.sleeper.com/stats/nfl/player/${playerId}?season_type=regular&season=${year}`;

const getRecentYears = (n: number): number[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: n }, (_, i) => currentYear - i);
};

async function fetchPlayerStats(
  playerId: string,
  year: number
): Promise<PlayerStatParent | null> {
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

  const stats = await Promise.all(
    yearsToPull.map((year) => fetchPlayerStats(player.player_id, year))
  );

  // Filter out null responses
  return stats.filter((s): s is PlayerStatParent => s !== null);
}
