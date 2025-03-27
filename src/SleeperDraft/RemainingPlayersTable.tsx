import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ValueGetterParams, RowDragEvent } from "ag-grid-community";
import { useAtomValue } from "jotai";
import { remainingPlayers, teams } from "../Atoms";
import { PlayerNameCellRenderer } from "../shared/PlayerNameCellRenderer";
import { formattedPick } from "../shared/utils";

export const RemainingPlayersTable: React.FC = () => {
    const rowData = useAtomValue(remainingPlayers)?.Players ?? [];
    const numTeams = useAtomValue(teams);
    console.log(numTeams);
    const defaultColDef = useMemo(() => {
        return { sortable: false };
    }, []);

    const [columnDefs] = useState<ColDef<Player>[]>([
        {
            headerName: "#",
            valueGetter: "node.rowIndex + 1",
            width: 70,
        },
        {
            headerName: "Rank",
            valueGetter: (params: ValueGetterParams<Player>) =>
                params.data?.rank,
            width: 70,
        },
        {
            headerName: "Pos #",
            valueGetter: (params: ValueGetterParams<Player>) =>
                params.data?.posRank,
            width: 70,
        },
        {
            headerName: "Pos",
            valueGetter: (params: ValueGetterParams<Player>) =>
                params.data?.position,
            width: 80,
        },
        {
            headerName: "Name",
            cellRenderer: PlayerNameCellRenderer,
        },
        {
            headerName: "Age",
            valueGetter: (params: ValueGetterParams<Player>) =>
                params.data?.age,
            width: 80,
        },
        {
            headerName: "Team",
            valueGetter: (params: ValueGetterParams<Player>) =>
                params.data?.team ?? "FA",
            width: 80,
        },
        {
            headerName: "College",
            valueGetter: (params: ValueGetterParams<Player>) =>
                params.data?.college,
            width: 160,
        },
    ]);

    return (
        <div
            className="ag-theme-alpine-dark"
            style={{ height: "75vh", width: "420px", margin: "2em" }}
        >
            <AgGridReact
                rowData={rowData.slice(0, 500)}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                animateRows={true}
                rowDragMultiRow={true}
                rowSelection={{ mode: "multiRow", headerCheckbox: false }}
                rowDragEntireRow={true}
                rowDragManaged={true}
                suppressScrollOnNewData={true}
                suppressDragLeaveHidesColumns={true}
            />
        </div>
    );
};
