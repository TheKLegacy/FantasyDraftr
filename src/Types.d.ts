import { PlayerDrafted } from "./player";
import { FilterValues } from "./Shared/Filters";

type DraftedBoard = {
    Players: PlayerDrafted[];
    Pick: number;
}

type buttonForModalProps = {
    openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type SleeperDraft = {
    draft_id: string;
    status: string;
    league_id: string;
    slot_to_roster_id: Record<string, number>;
    settings: {
        rounds: number;
        pick_timer: number;
        cpu_autopick: boolean;
        alpha_sort: boolean;
        [key: string]: any;
    };
    metadata: {
        scoring_type: string;
        name: string;
        description: string;
        [key: string]: any;
    };
    [key: string]: any;
};

type SleeperPick = {
    player_id: string;
    picked_by: string;
    roster_id: number;
    round: number;
    draft_slot: number;
    pick_no: number;
    metadata: {
        team: string;
        position: string;
        years_exp: number;
        [key: string]: any;
    };
    [key: string]: any;
};

type BoardPayload = {
    Name: string;
    Filters: FilterValues;
    Players: string[];
}