import { FormControlLabel, Switch, Box, TextField } from "@mui/material";
import React, { type ChangeEvent } from "react";
import type { Player } from "../player";
import { useAtom } from "jotai";
import { playerSearchAtom } from "../Atoms";

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
    const [search, setSearch] = useAtom(playerSearchAtom);

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
            <TextField
                size="small"
                label="Search players"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                sx={{ minWidth: 220 }}
            />
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
