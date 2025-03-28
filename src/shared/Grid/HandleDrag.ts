import { type RowDragEvent } from "ag-grid-community";

export function handleDrag<T extends { [key: string]: any }>(
    allItems: T[], 
    itemsInView: T[],
    event: RowDragEvent<T>, 
    idKey: string = 'player_id'
): T[] {

    // Extract dragged items
    const draggedData = event.nodes.map(node => node.data as T);
    
    // Create a copy of the current items
    let updatedItems = [...allItems];

    // Find the new index where items are being dropped
    const newIndex = updatedItems.findIndex(
        (item) => item[idKey] === itemsInView[event.overIndex][idKey]
    );

    // Remove dragged items from the original array
    draggedData.forEach(item => {
        updatedItems = updatedItems.filter(existingItem => 
            existingItem[idKey] !== item[idKey]
        );
    });

    // Insert dragged items at the new index
    updatedItems.splice(newIndex, 0, ...draggedData);

    //Update rank
    if (updatedItems[0] && 'rank' in updatedItems[0]) {
        updatedItems.forEach((item, index) => {
            (item as any).rank = index + 1;
        });
    }
    return updatedItems;
}