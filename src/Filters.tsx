import { FormControlLabel, Switch, Box } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { currentFiltersAtom, getCurrentBoard, updateBoard } from "./Atoms";
import type { Player } from "./player";

const filterKeys = [
    "QB", "RB", "WR", "TE", "RookiePicks", "Rookies Only"
] as const;

export type FilterTypes = (typeof filterKeys)[number];

export type FilterValues = Record<FilterTypes, boolean>;

export type Board = {
    Name: string;
    Filters: FilterValues;
    Players: Player[];
};

export const Filters: React.FC = () => {
    const filters = useAtomValue(currentFiltersAtom);
    const board = useAtomValue(getCurrentBoard);
    const setBoard = useSetAtom(updateBoard);

    const updateFilter = (
        event: ChangeEvent<HTMLInputElement>,
        filterProp: keyof typeof filters
    ) => {
        setBoard({
            ...board,
            Filters: {
                ...filters,
                [filterProp]: event.target.checked, // Update the specific filter dynamically
            },
        });
    };

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
        >
            {filterKeys.map(filterKey => (
                <FormControlLabel
                    key={filterKey}
                    control={
                        <Switch
                            checked={filters[filterKey]}
                            onChange={(e) => updateFilter(e, filterKey)}
                        />
                    }
                    label={filterKey}
                />
            ))}
        </Box>
    );
}