import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { PlayerStatParent } from "../Scripts/SleeperGetPlayer";
import { positions } from "../player";

type statTableProps = {
    rows: PlayerStatParent[];
    position: positions;
};

function getStatColumns(position: positions): [string[], string[]] {
    switch (position) {
        case "QB":
            return [
                ["pass_yd", "pass_td", "pass_int", "rush_td", "rush_yd"],
                [
                    "Pass Yards",
                    "Pass TDs",
                    "Ints",
                    "Rush TDs",
                    "Rush Yards",
                ],
            ];
        case "RB":
            return [
                ["rush_yd", "rush_td", "rec_yds", "rec_td", "rec"],
                [
                    "Rush Yards",
                    "Rush TDs",
                    "Rec Yards",
                    "Rec TDs",
                    "Recs",
                ],
            ];
        case "WR":
            return [
                ["rec_yds", "rec_td", "rec", "rec_tgt", "rec_rz_tgt"],
                [
                    "Rec Yards",
                    "Rec TDs",
                    "Recs",
                    "Tgts",
                    "RZ Tgts",
                ],
            ];
        case "TE":
            return [
                ["rec_yds", "rec_td", "rec", "rec_tgt", "rec_rz_tgt"],
                [
                    "Rec Yards",
                    "Rec TDs",
                    "Recs",
                    "Tgts",
                    "RZ Tgts",
                ],
            ];
        default:
            const _exhaustive: never = position;
            throw new Error(`Unhandled position: ${_exhaustive}`);
    }
}

const StatTable: React.FC<statTableProps> = ({ rows, position }) => {
    const statColumns = getStatColumns(position);

    return (
        <TableContainer>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="player stats"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell align="right">PPR Rank</TableCell>
                        <TableCell align="right">GP</TableCell>
                        {statColumns[1].map((th) => (
                            <TableCell align="right">{th}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow>
                            <TableCell align="right">{row.season}</TableCell>
                            <TableCell align="right">{row.stats.pos_rank_ppr}</TableCell>
                            <TableCell align="right">{row.stats.gp}</TableCell>
                            {statColumns[0].map((td) => (
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
