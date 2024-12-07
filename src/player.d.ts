type PlayerRaw = {
    metadata: any;
    player_id: string;
    search_last_name: string;
    full_name: string;
    oddsjam_id: string | null;
    height: string;
    college: string;
    search_rank: number;
    number: number;
    active: boolean;
    sport: string;
    pandascore_id: string | null;
    espn_id: number;
    news_updated: number | null;
    practice_description: string | null;
    injury_status: string | null;
    birth_city: string | null;
    status: string;
    fantasy_data_id: number;
    depth_chart_position: string | null;
    hashtag: string;
    injury_notes: string | null;
    yahoo_id: number;
    birth_date: string;
    practice_participation: string | null;
    first_name: string;
    birth_state: string | null;
    birth_country: string | null;
    search_full_name: string;
    high_school: string | null;
    injury_body_part: string | null;
    sportradar_id: string;
    team_abbr: string | null;
    competitions: any[]; // Assuming an array, but can be modified
    injury_start_date: string | null;
    years_exp: number;
    swish_id: number | null;
    rotowire_id: number;
    stats_id: number | null;
    team_changed_at: string | null;
    rotoworld_id: number | null;
    search_first_name: string;
    last_name: string;
    position: string;
    weight: string;
    opta_id: string | null;
    age: number;
    depth_chart_order: number | null;
    fantasy_positions: string[];
    gsis_id: string | null;
    team: string | null;
    rank: number | null;
    [key: string]: any;
};

type Player = Omit<
    PlayerRaw,
    | "metadata"
    | "search_last_name"
    | "oddsjam_id"
    | "sport"
    | "pandascore_id"
    | "espn_id"
    | "news_updated"
    | "practice_description"
    | "birth_city"
    | "fantasy_data_id"
    | "hashtag"
    | "yahoo_id"
    | "birth_date"
    | "birth_state"
    | "birth_country"
    | "search_full_name"
    | "high_school"
    | "injury_body_part"
    | "team_abbr"
    | "competitions"
    | "injury_start_date"
    | "swish_id"
    | "rotowire_id"
    | "stats_id"
    | "team_changed_at"
    | "rotoworld_id"
    | "search_first_name"
    | "opta_id"
    | "gsis_id"
>;

type FilteredPlayers = PlayerRaw[];
