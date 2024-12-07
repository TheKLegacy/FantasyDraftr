import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-alpine.css"; 
import { ColDef, ValueGetterParams, RowDragEvent } from 'ag-grid-community'; 
import 'ag-grid-enterprise';

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

  const [columnDefs] = useState<ColDef<Player>[]>([
    {
      headerName: "Rank", 
      valueGetter: (params: ValueGetterParams<Player>) => params.data?.rank,
    },
    {
      headerName: "Pos",
      valueGetter: (params: ValueGetterParams<Player>) => params.data?.position,
      filter: 'agSetColumnFilter'
    },
    {
      headerName: "Name",
      valueGetter: (params: ValueGetterParams<Player>) => params.data?.full_name,
    },
    {
      headerName: "Age",
      valueGetter: (params: ValueGetterParams<Player>) => params.data?.age,
    },
    {
      headerName: "Team",
      valueGetter: (params: ValueGetterParams<Player>) => params.data?.team ?? "FA",
    },
  ]);

  const onRowDragEnd = (event: RowDragEvent) => {
    console.log("test")
    const draggedData = event.node.data;
    const updatedData = [...rowData];
  
    const draggedIndex = updatedData.findIndex(item => item.player_id === draggedData.player_id);
  
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
    <div className="ag-theme-alpine-dark" style={{ height: 500, width: "100%" }}>
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
  );
}
