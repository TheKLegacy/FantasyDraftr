import React from "react";
import { EndDraftButton } from "../shared/EndDraftButton";
import { Filters } from "../Filters";
import { TeamCount } from "../shared/TeamCount";
import { RemainingPlayersTable } from "./RemainingPlayersTable";

export const SleeperDraftContainer: React.FC = () => {
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
                <RemainingPlayersTable />
            </div>
        </>
    );
};
