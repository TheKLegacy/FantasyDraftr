import React, { useMemo } from "react";
import type { ColDef, ValueGetterParams, RowDragEvent } from "ag-grid-community";
import { PlayerNameCellRenderer } from "../../Shared/PlayerNameCellRenderer";
import type { Player } from "../../player";
import { Actions } from "./Actions";
import type { Board } from "../Filters";
import { Button } from "@mui/material";
import { useSetAtom } from "jotai";
import { draftPlayerAction } from "../../Atoms";
import DataGridWrapper from "./DataGridWrapper";
import { handleDrag } from "./HandleDrag";

export type PlayerColumns =
    | "#"
    | "Rank"
    | "Pos #"
    | "Pos"
    | "Name"
    | "Team"
    | "Age"
    | "College"
    | "Grid Actions"
    | "Actions";

type PlayerGridProps = {
    columns: PlayerColumns[];
    data: Player[];
    currentPlayers: Player[];
    board: Board | undefined;
    setBoard: (payload: Board) => void;
    height?: string;
    width?: string;
};

export const StandardPlayerGrid: React.FC<PlayerGridProps> = (props: PlayerGridProps) => {
    const { columns, data, currentPlayers, board, setBoard, height, width } = props;

    const draft = useSetAtom(draftPlayerAction);

    // Comprehensive column definitions map
    const columnDefinitionsMap: Record<PlayerColumns, ColDef<Player>> = useMemo(
        () => ({
            "#": {
                headerName: "#",
                valueGetter: "node.rowIndex + 1",
                width: 70,
            },
            Rank: {
                headerName: "Rank",
                valueGetter: (params: ValueGetterParams<Player>) => params.data?.rank,
                width: 70,
            },
            "Pos #": {
                headerName: "Pos #",
                valueGetter: (params: ValueGetterParams<Player>) => params.data?.posRank,
                width: 70,
            },
            Pos: {
                headerName: "Pos",
                valueGetter: (params: ValueGetterParams<Player>) => params.data?.position,
                width: 80,
            },
            Name: {
                headerName: "Name",
                cellRenderer: PlayerNameCellRenderer,
            },
            Age: {
                headerName: "Age",
                valueGetter: (params: ValueGetterParams<Player>) => params.data?.age,
                width: 80,
            },
            Team: {
                headerName: "Team",
                valueGetter: (params: ValueGetterParams<Player>) => params.data?.team ?? "FA",
                width: 80,
            },
            College: {
                headerName: "College",
                valueGetter: (params: ValueGetterParams<Player>) => params.data?.college,
                width: 160,
            },
            "Grid Actions": {
                headerName: "Actions",
                cellRenderer: Actions,
            },
            Actions: {
                headerName: "Actions",
                cellRenderer: (params: ValueGetterParams<Player>) => (
                    <Button onClick={() => draft(params.data!)} variant="text">
                        Draft
                    </Button>
                ),
            },
        }),
        []
    );

    // Dynamically generate column definitions based on passed columns
    const columnDefs = useMemo(() => {
        return columns.map((col) => columnDefinitionsMap[col]);
    }, [columns, columnDefinitionsMap]);

    const onRowDragEnd = (event: RowDragEvent<Player>) => {
        const updatedPlayers = handleDrag(currentPlayers, data, event);
        setBoard({ ...board!, Players: updatedPlayers });
    };

    return <DataGridWrapper {...{ data, columnDefs, onRowDragEnd, height, width }} />;
};
