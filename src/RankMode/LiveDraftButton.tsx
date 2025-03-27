import { Button } from "@mui/material";
import React from "react";
import { displayMode, getCurrentBoard, remainingPlayers } from "../Atoms";
import { useAtomValue, useSetAtom } from "jotai";

export const LiveDraftButton: React.FC = () => {
    const setDisplayMode = useSetAtom(displayMode);
    const setRemainingPlayers = useSetAtom(remainingPlayers);
    const currentBoard = useAtomValue(getCurrentBoard);

    return (
        <>
            <Button
                variant="outlined"
                size="large"
                onClick={() => {
                    setDisplayMode("livedraft");
                    setRemainingPlayers(currentBoard);
                }}
            >
                Join Sleeper Draft
            </Button>
        </>
    );
};
