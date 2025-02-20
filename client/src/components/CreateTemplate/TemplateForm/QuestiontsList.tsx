import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { QuestionField } from './items/QuestionField';

interface QuestionsListProps {
    fields: { id: string }[];
    onDragEnd: (result: DropResult) => void;
    onQuestionDelete: (index: number) => void;
}

export const QuestionsList: React.FC<QuestionsListProps> = ({
    fields,
    onDragEnd,
    onQuestionDelete,
}) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
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