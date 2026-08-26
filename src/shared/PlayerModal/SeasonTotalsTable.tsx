import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { PlayerSeasonStats } from "../../Scripts/SleeperGetPlayer";
import type { positions } from "../../player";

type SeasonTotalsTableProps = {
    rows: PlayerSeasonStats[];
    position: positions;
};

const columnsByPosition: Record<positions, { keys: string[]; labels: string[] }> = {
    QB: {
        keys: ["pos_rank_ppr", "gp", "pass_yd", "pass_td", "pass_int", "rush_td", "rush_yd"],
        labels: ["PPR Rank", "GP", "Pass Yards", "Pass TDs", "Ints", "Rush TDs", "Rush Yards"],
    },
    RB: {
        keys: ["pos_rank_ppr", "gp", "rush_yd", "rush_td", "rec_yd", "rec_td", "rec"],
        labels: ["PPR Rank", "GP", "Rush Yards", "Rush TDs", "Rec Yards", "Rec TDs", "Recs"],
    },
    WR: {
        keys: ["pos_rank_ppr", "gp", "rec_yd", "rec_td", "rec", "rec_tgt", "rec_rz_tgt"],
        labels: ["PPR Rank", "GP", "Rec Yards", "Rec TDs", "Recs", "Tgts", "RZ Tgts"],
    },
    TE: {
        keys: ["pos_rank_ppr", "gp", "rec_yd", "rec_td", "rec", "rec_tgt", "rec_rz_tgt"],
        labels: ["PPR Rank", "GP", "Rec Yards", "Rec TDs", "Recs", "Tgts", "RZ Tgts"],
    },
};

const SeasonTotalsTable: React.FC<SeasonTotalsTableProps> = ({ rows, position }) => {
    const columns = columnsByPosition[position];

    return (
        <TableContainer>
            <Table size="small" aria-label="season totals">
                <TableHead>
                    <TableRow>
                        <TableCell>Season</TableCell>
                        {columns.labels.map((label) => <TableCell key={label} align="right">{label}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.season}>
                            <TableCell>{row.season}</TableCell>
                            {columns.keys.map((key) => <TableCell key={key} align="right">{row.stats[key] ?? "-"}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default SeasonTotalsTable;