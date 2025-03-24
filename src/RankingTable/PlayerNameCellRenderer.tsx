import React from "react";
import { SyntheticEvent } from "react";

export const PlayerNameCellRenderer = (props: any) => {
    const { data } = props;
    const imageUrl = `https://sleepercdn.com/content/nfl/players/thumb/${data?.player_id}.jpg`;
    return (
        <div>
            <span style={{minWidth: "50px", display:"inline-block"}}>
                <img 
                    style={{ height: '32px', width: 'auto', flex: "0 0 32px;"}} 
                    src={imageUrl} 
                    onError = {(event: SyntheticEvent<HTMLImageElement, Event>) => {
                        event.currentTarget.src="https://sleepercdn.com/images/v2/icons/player_default.webp";
                      }}
                /> 
            </span>
            {data?.full_name}
        </div>
    );
};