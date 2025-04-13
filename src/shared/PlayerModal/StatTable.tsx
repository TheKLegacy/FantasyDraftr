import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { PlayerStatParent } from "../../Scripts/SleeperGetPlayer";
import type { positions } from "../../player";

type statTableProps = {
    rows: PlayerStatParent[];
    position: positions;
};

function getStatColumns(position: positions): { statKeys: string[]; statDisplayNames: string[] } {
    switch (position) {
        case "QB":
            return {
                statKeys: ["pass_yd", "pass_td", "pass_int", "rush_td", "rush_yd"],
                statDisplayNames: ["Pass Yards", "Pass TDs", "Ints", "Rush TDs", "Rush Yards"],
            };
        case "RB":
            return {
                statKeys: ["rush_yd", "rush_td", "rec_yd", "rec_td", "rec"],
                statDisplayNames: ["Rush Yards", "Rush TDs", "Rec Yards", "Rec TDs", "Recs"],
            };
        case "WR":
            return {
                statKeys: ["rec_yd", "rec_td", "rec", "rec_tgt", "rec_rz_tgt"],
                statDisplayNames: ["Rec Yards", "Rec TDs", "Recs", "Tgts", "RZ Tgts"],
            };
        case "TE":
            return {
                statKeys: ["rec_yd", "rec_td", "rec", "rec_tgt", "rec_rz_tgt"],
                statDisplayNames: ["Rec Yards", "Rec TDs", "Recs", "Tgts", "RZ Tgts"],
            };
    }
}

const StatTable: React.FC<statTableProps> = ({ rows, position }) => {
    const statColumns = getStatColumns(position);

    return (
        <TableContainer>
            <Table size="small" aria-label="player stats">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell align="right">PPR Rank</TableCell>
                        <TableCell align="right">GP</TableCell>
                        {statColumns.statDisplayNames.map((th) => (
                            <TableCell align="right">{th}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.season}</TableCell>
                            <TableCell align="right">{row.stats.pos_rank_ppr}</TableCell>
                            <TableCell align="right">{row.stats.gp}</TableCell>
                            {statColumns.statKeys.map((td) => (
                                <TableCell align="right">{row.stats[td]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StatTable;
