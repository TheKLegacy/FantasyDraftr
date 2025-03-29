import { Button } from "@mui/material";
import React from "react";
import { displayModeAtom } from "../Atoms";
import { useSetAtom } from "jotai";

export const EndDraftButton: React.FC = () => {
    const setDisplayMode = useSetAtom(displayModeAtom);

    return (
        <>
            <Button variant="outlined" size="large" onClick={() => setDisplayMode("rank")}>
                Leave Draft
            </Button>
        </>
    );
}
