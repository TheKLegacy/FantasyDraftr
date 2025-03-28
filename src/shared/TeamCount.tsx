import { Button, TextField } from "@mui/material";
import React from "react";
import { teams } from "../Atoms";
import { useAtom } from "jotai";

export const TeamCount: React.FC = () => {
    const [numTeams, setNumTeams] = useAtom(teams);

    return (
        <>
            <TextField type="number" id="outlined-basic" label="Number of Teams" variant="outlined" value={numTeams} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNumTeams(parseInt(event.target.value));
            }}/>
        </>
    );
}
