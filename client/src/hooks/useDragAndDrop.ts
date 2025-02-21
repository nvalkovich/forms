import { DropResult } from '@hello-pangea/dnd';
import { useCallback } from 'react';

export const useDragAndDrop = (move: (from: number, to: number) => void) => {
    const onDragEnd = useCallback(
        (result: DropResult) => {
            const { destination, source } = result;

            if (!destination) {
                return;
            }

            if (
                destination.droppableId === source.droppableId &&
                destination.index === source.index
            ) {
                return;
            }

            move(source.index, destination.index);
        },
        [move],
    );

    return { onDragEnd };
};
