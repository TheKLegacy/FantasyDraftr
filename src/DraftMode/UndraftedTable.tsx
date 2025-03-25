import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ValueGetterParams, RowDragEvent } from "ag-grid-community";
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { updateBoard, filteredDraftBoardPlayersAtom, draftBoard } from "../Atoms";
import { PlayerNameCellRenderer } from "../shared/PlayerNameCellRenderer";

export const UndraftedTable: React.FC = () => {
    const rowData = useAtomValue(filteredDraftBoardPlayersAtom);
    const [board, setBoard] = useAtom(draftBoard);

    const defaultColDef = useMemo(() => { return { sortable: false, }; }, []);    

    const [columnDefs] = useState<ColDef<Player>[]>([
        {
            headerName: "#",
            valueGetter: "node.rowIndex + 1",
            width: 70
        },
        {
            headerName: "Rank",
            valueGetter: (params: ValueGetterParams<Player>) =>
                params.data?.rank,
            width: 70
        },
        {
            headerName: "Pos #",
            valueGetter: (params: ValueGetterParams<Player>) =>
                params.data?.posRank,
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
        {
            headerName: "Age",
            valueGetter: (params: ValueGetterParams<Player>) =>
                params.data?.age,
            width: 80
        },
        {
            headerName: "Team",
            valueGetter: (params: ValueGetterParams<Player>) =>
                params.data?.team ?? "FA",
            width: 80
        },
        {
            headerName: "College",
            valueGetter: (params: ValueGetterParams<Player>) =>
                params.data?.college,
            width: 160
        }
    ]);

    const onRowDragEnd = (event: RowDragEvent) => {
        const draggedData = event.node.data;
        const updatedData = [...board.Players];

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
                style={{ height: "75vh", width: "860px", margin: "2em" }}
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
