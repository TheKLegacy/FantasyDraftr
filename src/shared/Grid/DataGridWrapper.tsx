import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, RowClassParams, RowDragEndEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

type DataGridWrapperProps<T> = {
    data: T[];
    columnDefs: ColDef<T>[];
    onRowDragEnd?: (event: RowDragEndEvent) => void;
    defaultColumnConfig?: Partial<ColDef<T>>;
    height?: string;
    width?: string;
    highlightedRows?: number[];
};

const DataGridWrapper = <T,>(props: DataGridWrapperProps<T>) => {
    const { data, columnDefs, onRowDragEnd, height, width, highlightedRows } = props;
    const rowData = useMemo(() => data.slice(0, 500), [data]);
    const defaultColDef = useMemo(() => {
        return { sortable: false };
    }, []);
    const getRowStyle = (params: RowClassParams) => {
        if (highlightedRows?.includes(params.rowIndex + 1)) return { background: "#6E4D25" };
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
                style={{
                    height: height,
                    width: width,
                    marginTop: "1em",
                }}
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    rowDragMultiRow={true}
                    rowSelection={{
                        mode: "multiRow",
                        headerCheckbox: false,
                    }}
                    onRowDragEnd={onRowDragEnd}
                    rowDragEntireRow={true}
                    rowDragManaged={true}
                    suppressScrollOnNewData={true}
                    suppressDragLeaveHidesColumns={true}
                    suppressCellFocus={true}
                    getRowStyle={getRowStyle}
                />
            </div>
        </div>
    );
};

export default DataGridWrapper;
