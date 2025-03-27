import React, { SyntheticEvent, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ValueGetterParams, RowDragEvent } from "ag-grid-community";
import { useAtomValue, useSetAtom } from "jotai";
import {
    filteredPlayersAtom,
    getCurrentBoard,
    updateBoard,
    currentPlayersAtom,
} from "../../Atoms";
import { PlayerNameCellRenderer } from "../../shared/PlayerNameCellRenderer";
import { Actions } from "./Actions";

export const PlayerTable: React.FC = () => {
    const rowData = useAtomValue(filteredPlayersAtom);
    const currentPlayers = useAtomValue(currentPlayersAtom);
    const board = useAtomValue(getCurrentBoard);
    const setBoard = useSetAtom(updateBoard);

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
        {
            headerName: "Actions",
            cellRenderer: Actions,
        },
    ]);

    const onRowDragEnd = (event: RowDragEvent<Player>) => {
        const nodes = event.nodes;
        const draggedData = nodes.map((node) => node.data);
        let updatedData = [...currentPlayers];

        const newIndex = updatedData.findIndex(
            (p) => p.player_id === rowData[event.overIndex].player_id
        );

        draggedData.forEach(
            (p) =>
                (updatedData = updatedData.filter(
                    (p2) => p?.player_id !== p2.player_id
                ))
        );
        updatedData.splice(newIndex, 0, ...draggedData);

        updatedData.forEach((player, index) => {
            player.rank = index + 1;
        });

        setBoard({ ...board, Players: updatedData });
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                marginTop: "1em",
            }}
        >
            <div
                className="ag-theme-alpine-dark"
                style={{ height: "75vh", width: "1080px", marginTop: "1em" }}
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
        </div>
    );
};
