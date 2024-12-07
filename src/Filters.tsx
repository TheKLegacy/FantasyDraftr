import {
    FormControlLabel,
    Switch,
    Box,
} from "@mui/material";
import React from "react";

interface PlayerDataProps {
    data: Player[];
}

export function Filters({ data }: PlayerDataProps) {
    return (
        <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%' }}
        >
            <FormControlLabel control={<Switch defaultChecked />} label="QB" />
            <FormControlLabel control={<Switch defaultChecked />} label="RB" />
            <FormControlLabel control={<Switch defaultChecked />} label="WR" />
            <FormControlLabel control={<Switch defaultChecked />} label="TE" />
            <FormControlLabel control={<Switch defaultChecked />} label="K" />
            <FormControlLabel control={<Switch defaultChecked />} label="DEF" />
            <FormControlLabel control={<Switch defaultChecked />} label="Rookie Picks" />
            <FormControlLabel control={<Switch defaultChecked />} label="IDP" />
            <FormControlLabel control={<Switch defaultChecked />} label="DL" />
            <FormControlLabel control={<Switch defaultChecked />} label="LB" />
            <FormControlLabel control={<Switch defaultChecked />} label="DB" />
        </Box>
    );
}
