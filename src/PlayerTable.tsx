import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ValueGetterParams, RowDragEvent } from "ag-grid-community";

interface PlayerTableProps {
    data: Player[];
}

export function PlayerTable({ data }: PlayerTableProps) {
    const [rowData, setRowData] = useState(data);

    const defaultColDef = useMemo(() => {
        return {
            sortable: false,
        };
    }, []);

    const [columnDefs] = useState<ColDef<PlayerRaw>[]>([
        {
            headerName: "Rank",
            valueGetter: (params: ValueGetterParams<PlayerRaw>) =>
                params.data?.rank,
        },
        {
            headerName: "Pos",
            valueGetter: (params: ValueGetterParams<PlayerRaw>) =>
                params.data?.position,
        },
        {
            headerName: "Name",
            valueGetter: (params: ValueGetterParams<PlayerRaw>) =>
                params.data?.full_name,
        },
        {
            headerName: "Age",
            valueGetter: (params: ValueGetterParams<PlayerRaw>) =>
                params.data?.age,
        },
        {
            headerName: "Team",
            valueGetter: (params: ValueGetterParams<PlayerRaw>) =>
                params.data?.team ?? "FA",
        },
    ]);

    const onRowDragEnd = (event: RowDragEvent) => {
        console.log("test");
        const draggedData = event.node.data;
        const updatedData = [...rowData];

        const draggedIndex = updatedData.findIndex(
            (item) => item.player_id === draggedData.player_id
        );

        if (draggedIndex !== -1) {
            updatedData.splice(draggedIndex, 1);

            updatedData.splice(event.overIndex, 0, draggedData);

            updatedData.forEach((player, index) => {
                player.rank = index + 1;
            });

            setRowData(updatedData);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                margin: "2em",
            }}
        >
            <div
                className="ag-theme-alpine-dark"
                style={{ height: 500, width: "80%", margin: "2em" }}
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    rowDragMultiRow={true}
                    rowSelection={{ mode: "multiRow", headerCheckbox: false }}
                    onRowDragEnd={onRowDragEnd}
                    rowDragEntireRow={true}
                    rowDragManaged={true}
                    suppressScrollOnNewData={true}
                    suppressDragLeaveHidesColumns={true}
                />
            </div>
        </div>
    );
}
