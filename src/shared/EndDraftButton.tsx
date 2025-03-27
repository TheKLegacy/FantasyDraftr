import { Button } from "@mui/material";
import React from "react";
import { displayMode } from "../Atoms";
import { useSetAtom } from "jotai";

export const EndDraftButton: React.FC = () => {
    const setDisplayMode = useSetAtom(displayMode);

    return (
        <>
            <Button
                variant="outlined"
                size="large"
                onClick={() => setDisplayMode("rank")}
            >
                Leave Draft
            </Button>
        </>
    );
};
