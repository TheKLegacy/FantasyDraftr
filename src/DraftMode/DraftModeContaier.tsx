import React from "react";
import { EndDraftButton } from "../shared/EndDraftButton";
import { Filters } from "../Filters";
import { DraftedTable } from "./DraftedTable";
import { UndraftedTable } from "./UndraftedTable";
import { TeamCount } from "../shared/TeamCount";

export const DraftModeContainer: React.FC = () => {
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
            </div>
            <Filters />
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
