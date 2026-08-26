import React, { useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import type { Player } from "../player";
import PlayerModal from "./PlayerModal/PlayerModal";

export const PlayerNameCellRenderer = (props: { data: Player }) => {
    const { data } = props;
    const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
    const pointerStart = useRef<{ x: number; y: number } | null>(null);
    const imageUrl = `https://sleepercdn.com/content/nfl/players/thumb/${data?.player_id}.jpg`;

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        pointerStart.current = { x: event.clientX, y: event.clientY };
    };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const start = pointerStart.current;
        pointerStart.current = null;

        if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) return;
        setIsPlayerModalOpen(true);
    };

    return (
        <>
            <div onPointerDown={handlePointerDown} onClick={handleClick}>
                <span style={{ minWidth: "50px", display: "inline-block" }}>
                    <img
                        style={{
                            height: "32px",
                            width: "auto",
                            flex: "0 0 32px",
                        }}
                        src={imageUrl}
                        onError={(event: SyntheticEvent<HTMLImageElement, Event>) => {
                            event.currentTarget.src = "https://sleepercdn.com/images/v2/icons/player_default.webp";
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
