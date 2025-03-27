import React from "react";
import { Actions } from "./Actions";
import { PlayerTable } from "./RankingTable/PlayerTable";

export const RankModeContainer: React.FC = () => (
    <>
        <Actions />
        <PlayerTable />
    </>
);
