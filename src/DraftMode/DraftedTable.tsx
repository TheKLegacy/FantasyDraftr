import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ValueGetterParams, RowDragEvent } from "ag-grid-community";
import { useAtomValue } from 'jotai';
import { draftedBoard, teams } from "../Atoms";
import { PlayerNameCellRenderer } from "../shared/PlayerNameCellRenderer";
import { formattedPick } from "../shared/utils";
import type { PlayerDrafted } from "../player";

export const DraftedTable: React.FC = () => {
    const rowData = useAtomValue(draftedBoard).Players;
    const numTeams = useAtomValue(teams);
    console.log(numTeams);
    const defaultColDef = useMemo(() => { return { sortable: false, }; }, []);    

    const columnDefs = useMemo<ColDef<PlayerDrafted>[]>(() => [
        {
            headerName: "Pick",
            valueGetter: (params: ValueGetterParams<PlayerDrafted>) => 
                formattedPick(params.data?.Pick ?? 0, numTeams),
            width: 70
        },
        {
            headerName: "Pos",
            valueGetter: (params: ValueGetterParams<PlayerDrafted>) =>
                params.data?.position,
            width: 80
        },
        {
            headerName: "Name",
            cellRenderer: PlayerNameCellRenderer
        },
    ], [numTeams]);

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
}
