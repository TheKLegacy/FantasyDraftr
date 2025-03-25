import { Button } from "@mui/material";
import React from "react";
import { displayMode, draftBoard, getCurrentBoard } from "../Atoms";
import { useAtomValue, useSetAtom } from "jotai";

export const StartDraftButton: React.FC = () => {
    const setDisplayMode = useSetAtom(displayMode);
    const setDraftBoardAtom = useSetAtom(draftBoard);
    const currentBoard = useAtomValue(getCurrentBoard);

    return (
        <>
            <Button variant="outlined" size="large" onClick={() => (setDisplayMode("draft"),  setDraftBoardAtom(currentBoard))}>
                Start Draft
            </Button>
        </>
    );
}
