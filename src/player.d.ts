type Player = {
    metadata: any; // Could be null or an object, depending on your needs
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
  };
  
  type FilteredPlayers = Player[];
  