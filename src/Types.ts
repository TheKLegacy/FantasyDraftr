export type FilterValues = {
    QB: boolean;
    RB: boolean;
    WR: boolean;
    TE: boolean;
    K: boolean;
    DEF: boolean;
    RookiePicks: boolean;
    IDP: boolean;
    DL: boolean;
    LB: boolean;
    DB: boolean;
};

export type Board = {
    Name: string,
    Filters: FilterValues,
    Players: Player[]
};