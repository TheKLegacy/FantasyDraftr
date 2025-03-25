import { FormControlLabel, Switch, Box } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { currentFiltersAtom, getCurrentBoard, updateBoard } from "./Atoms";

export const Filters: React.FC = () => {
    const filters = useAtomValue(currentFiltersAtom);
    const board = useAtomValue(getCurrentBoard);
    const setBoard = useSetAtom(updateBoard);
    const filterProps = ["QB", "RB", "WR", "TE", "K", "Rookies Only", "DEF", "IDP", "DL", "LB", "DB"] as const;

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
            {filterProps.map(filterProp => (
                <FormControlLabel
                    key={filterProp}
                    control={
                        <Switch
                            checked={filters[filterProp]}
                            onChange={(e) => updateFilter(e, filterProp)}
                        />
                    }
                    label={filterProp}
                />
            ))}
        </Box>
    );
}