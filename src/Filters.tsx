import {
    FormControlLabel,
    Switch,
    Box,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import { useAtom } from "jotai";
import { currentBoardAtom, currentFiltersAtom } from "./Atoms";

interface PlayerDataProps {
    data: Player[];
}

export function Filters({ data }: PlayerDataProps) {
    const [filters] = useAtom(currentFiltersAtom);
    const [board, setBoard] = useAtom(currentBoardAtom);

    const updateFilter = (event: ChangeEvent<HTMLInputElement>, filterProp: keyof typeof filters) => {
        setBoard({
            ...board,
            Filters: {
                ...filters,
                [filterProp]: event.target.checked, // Update the specific filter dynamically
            },
        });
    };

    console.log(filters)

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%' }}
        >
            <FormControlLabel control={<Switch checked={filters.QB} onChange={(e) => updateFilter(e, "QB")}/>} label="QB" />
            <FormControlLabel control={<Switch checked={filters.RB} onChange={(e) => updateFilter(e, "RB")}/>} label="RB" />
            <FormControlLabel control={<Switch checked={filters.WR} onChange={(e) => updateFilter(e, "WR")}/>} label="WR" />
            <FormControlLabel control={<Switch checked={filters.TE} onChange={(e) => updateFilter(e, "TE")}/>} label="TE" />
            <FormControlLabel control={<Switch checked={filters.K} onChange={(e) => updateFilter(e, "K")}/>} label="K" />
            <FormControlLabel control={<Switch checked={filters.DEF} onChange={(e) => updateFilter(e, "DEF")}/>} label="DEF" />
            {/* <FormControlLabel control={<Switch value={filters.QB}/>} label="Rookie Picks" /> */}
            <FormControlLabel control={<Switch checked={filters.IDP} onChange={(e) => updateFilter(e, "IDP")}/>} label="IDP" />
            <FormControlLabel control={<Switch checked={filters.DL} onChange={(e) => updateFilter(e, "DL")}/>} label="DL" />
            <FormControlLabel control={<Switch checked={filters.LB} onChange={(e) => updateFilter(e, "LB")}/>} label="LB" />
            <FormControlLabel control={<Switch checked={filters.DB} onChange={(e) => updateFilter(e, "DB")}/>} label="DB" />
        </Box>
    );
}
