import { FormControlLabel, Switch, Box } from "@mui/material";
import React, { ChangeEvent } from "react";
import type { Player } from "../player";

const filterKeys = ["QB", "RB", "WR", "TE", "Rookies Only"] as const;

export type FilterTypes = (typeof filterKeys)[number];

export type FilterValues = Record<FilterTypes, boolean>;

export type Board = {
    Name: string;
    Filters: FilterValues;
    Players: Player[];
};

export type filterProps = {
    board: Board;
    setBoard: (x: Board) => unknown;
};

export const Filters: React.FC<filterProps> = (props: filterProps) => {
    const filters = props.board.Filters;
    const board = props.board;

    const updateFilter = (event: ChangeEvent<HTMLInputElement>, filterProp: keyof typeof filters) => {
        props.setBoard({
            ...board,
            Filters: {
                ...filters,
                [filterProp]: event.target.checked, // Update the specific filter dynamically
            },
        });
    };

    return (
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" alignItems="center" sx={{ width: "100%" }}>
            {filterKeys.map((filterKey) => (
                <FormControlLabel
                    key={filterKey}
                    control={<Switch checked={filters[filterKey]} onChange={(e) => updateFilter(e, filterKey)} />}
                    label={filterKey}
                />
            ))}
        </Box>
    );
};
