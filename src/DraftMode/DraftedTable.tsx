import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ValueGetterParams, RowDragEvent } from "ag-grid-community";
import { useAtomValue, useSetAtom } from 'jotai';
import { filteredPlayersAtom, getCurrentBoard, updateBoard, currentPlayersAtom } from "../Atoms";
import { PlayerNameCellRenderer } from "../shared/PlayerNameCellRenderer";

export const DraftedTable: React.FC = () => {
    const rowData = useAtomValue(filteredPlayersAtom);
    const currentPlayers = useAtomValue(currentPlayersAtom);
    const board = useAtomValue(getCurrentBoard);
    const setBoard = useSetAtom(updateBoard);

    const defaultColDef = useMemo(() => { return { sortable: false, }; }, []);    

    const [columnDefs] = useState<ColDef<Player>[]>([
        {
            headerName: "#",
            valueGetter: "node.rowIndex + 1",
            width: 70
        },
        {
            headerName: "Pos",
            valueGetter: (params: ValueGetterParams<Player>) =>
                params.data?.position,
            width: 80
        },
        {
            headerName: "Name",
            cellRenderer: PlayerNameCellRenderer
        },
    ]);

    const onRowDragEnd = (event: RowDragEvent) => {
        const draggedData = event.node.data;
        const updatedData = [...currentPlayers];

        const draggedIndex = updatedData.findIndex(
            (item) => item.player_id === draggedData.player_id
        );

        if (draggedIndex !== -1) {
            const newIndex = updatedData.findIndex(
                (p) => p.player_id === rowData[event.overIndex].player_id
            );

            updatedData.splice(draggedIndex, 1);
            updatedData.splice(newIndex, 0, draggedData);

            updatedData.forEach((player, index) => {
                player.rank = index + 1;
            });

            setBoard({ ...board, Players: updatedData });
        }
    };

    return (
        <div
            className="ag-theme-alpine-dark"
            style={{ height: "75vh", width: "450px", margin: "2em" }}
        >
            <AgGridReact
                rowData={rowData.slice(0, 500)}
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
    );
}
