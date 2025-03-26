export const formattedPick = (pick: number, teams: number) => 
    `${Math.floor((pick - 1) / teams) + 1}.${((pick - 1) % teams) + 1}`;
