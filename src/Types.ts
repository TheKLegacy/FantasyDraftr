type FilterValues = {
    QB: boolean;
    RB: boolean;
    WR: boolean;
    TE: boolean;
    K: boolean;
    DEF: boolean;
    RookiePicks: boolean;
    "Rookies Only": boolean
    IDP: boolean;
    DL: boolean;
    LB: boolean;
    DB: boolean;
    [key: string]: boolean;
};

type Board = {
    Name: string;
    Filters: FilterValues;
    Players: Player[];
};

type DraftedBoard = {
    Players: PlayerDrafted[];
    Pick: Number;
}