import { FilterValues } from "./Filters";
import { Player } from "../player";

export const formattedPick = (pick: number, teams: number) => 
    `${Math.floor((pick - 1) / teams) + 1}.${((pick - 1) % teams) + 1}`;

export const filterPlayers = (players: Player[], filters: FilterValues): Player[] => {
    let qbRanking = 0, rbRanking = 0, wrRanking = 0, teRanking = 0, dlRanking = 0, lbRanking = 0, dbRanking = 0;
    return players.filter(player => {
        const positionMatches = filters[player?.position];
        
        if(filters["Rookies Only"] && player?.years_exp !== 0){
            return false;
        }

        if(positionMatches){
            switch(player?.position.toUpperCase()) {
                case "QB":
                    player.posRank = ++qbRanking;
                    break;
                case "RB":
                    player.posRank = ++rbRanking;
                    break;
                case "WR":
                    player.posRank = ++wrRanking;
                    break;
                case "TE":
                    player.posRank = ++teRanking;
                    break;
            }
            return true;
        }
        return false;
    });
}