import React from "react";
import { EndDraftButton } from "../Shared/EndDraftButton";
import { Filters } from "../Shared/Filters";
import { DraftedTable } from "./DraftedTable";
import { UndraftedTable } from "./UndraftedTable";
import { TeamCount } from "../Shared/TeamCount";
import { useAtom } from "jotai";
import { draftBoardAtom } from "../Atoms";
import { UndoPickButton } from "./UndoPickButton";

export const DraftModeContainer: React.FC = () => {
    const [board, setBoard] = useAtom(draftBoardAtom);

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    margin: "2em",
                }}
            >
                <EndDraftButton />
                <TeamCount />
                <UndoPickButton />
            </div>
            <Filters board={board!} setBoard={setBoard} />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    margin: "2em",
                }}
            >
                <UndraftedTable />
                <DraftedTable />
            </div>
        </>
    );
};
