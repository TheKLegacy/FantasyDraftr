import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, RowDragEndEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css"

interface DataGridWrapperProps<T> {
    data: T[];
    columnDefs: ColDef<T>[];
    onRowDragEnd?: (event: RowDragEndEvent) => void;
    defaultColumnConfig?: Partial<ColDef<T>>;
    height?: string;
    width?: string;
}

const DataGridWrapper = <T,>(props: DataGridWrapperProps<T>) => {
    const { data, columnDefs, onRowDragEnd } = props;

    // Memoize row data to prevent unnecessary re-renders
    const rowData = useMemo(() => data.slice(0, 500), [data]);

    // Default column configuration with ability to override
    const defaultColDef = useMemo(() => {
        return { sortable: false };
    }, []);

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
                    height: props.height,
                    width: props.width,
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
                />
            </div>
        </div>
    );
};

export default DataGridWrapper;
