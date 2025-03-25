import { Button } from "@mui/material";
import React from "react";
import { displayMode, draftBoard, getCurrentBoard } from "../Atoms";
import { useAtomValue, useSetAtom } from "jotai";

export const LiveDraftButton: React.FC = () => {
    const setDisplayMode = useSetAtom(displayMode);
    const setDraftBoardAtom = useSetAtom(draftBoard);
    const currentBoard = useAtomValue(getCurrentBoard);

    return (
        <>
            <Button variant="outlined" size="large" onClick={() => {setDisplayMode("livedraft"); console.log("currentBoard", currentBoard); setDraftBoardAtom(currentBoard);}}>
                Join Sleeper Draft
            </Button>
        </>
    );
}
