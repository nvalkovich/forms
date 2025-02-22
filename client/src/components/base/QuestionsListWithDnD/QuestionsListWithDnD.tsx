import React from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from '@hello-pangea/dnd';
import { QuestionField } from '../QuestionField/QuestionField';

interface QuestionsListWithDnDProps {
    fields: { id: string }[];
    onDragEnd: (result: DropResult) => void;
    onQuestionDelete: (index: number) => void;
}

export const QuestionsListWithDnD = ({
    fields,
    onDragEnd,
    onQuestionDelete,
}: QuestionsListWithDnDProps) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {fields.map((field, index) => (
                            <Draggable
                                key={field.id}
                                draggableId={field.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <QuestionField
                                            key={field.id}
                                            index={index}
                                            remove={onQuestionDelete}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
