import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Player } from "../player";
import PlayerModal from "./PlayerModal";

export const PlayerNameCellRenderer = (props: { data: Player }) => {
    const { data } = props;
    const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
    const imageUrl = `https://sleepercdn.com/content/nfl/players/thumb/${data?.player_id}.jpg`;

    return (
        <>
            <div onClick={() => setIsPlayerModalOpen(true)}>
                <span style={{ minWidth: "50px", display: "inline-block" }}>
                    <img
                        style={{
                            height: "32px",
                            width: "auto",
                            flex: "0 0 32px",
                        }}
                        src={imageUrl}
                        onError={(
                            event: SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                            event.currentTarget.src =
                                "https://sleepercdn.com/images/v2/icons/player_default.webp";
                        }}
                    />
                </span>
                {data?.full_name}
            </div>
            <PlayerModal
                player={data}
                open={isPlayerModalOpen}
                onClose={() => {
                    setIsPlayerModalOpen(false);
                }}
                imageUrl={imageUrl}
            />
        </>
    );
};
