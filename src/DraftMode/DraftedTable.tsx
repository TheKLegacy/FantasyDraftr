import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ValueGetterParams, RowDragEvent } from "ag-grid-community";
import { useAtomValue } from 'jotai';
import { draftedBoard } from "../Atoms";
import { PlayerNameCellRenderer } from "../shared/PlayerNameCellRenderer";

export const DraftedTable: React.FC = () => {
    const rowData = useAtomValue(draftedBoard).Players;

    const defaultColDef = useMemo(() => { return { sortable: false, }; }, []);    

    const [columnDefs] = useState<ColDef<PlayerDrafted>[]>([
        {
            headerName: "Pick",
            valueGetter: (params: ValueGetterParams<PlayerDrafted>) => {
                const pick = params.data?.Pick ?? 0;
                return `${Math.floor((pick - 1) / 12) + 1}.${((pick - 1) % 12) + 1}`
            },
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
}
