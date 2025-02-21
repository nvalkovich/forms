import { useCallback, useMemo, useState, useEffect } from 'react';
import { QuestionTypes, Question } from '@/types';
import {
    getDefaultQuestionType,
    getDefaultQuestionValues,
} from '@/utils/templateUtils';

export const useQuestionManagement = (
    questions: Question[],
    append: (question: Question) => void,
    remove: (index: number) => void,
) => {
    const memoizedQuestions = useMemo(() => questions, [questions]);

    const getAvailableType = useCallback((questions: Question[]) => {
        return getDefaultQuestionType(questions);
    }, []);

    const [availableType, setAvailableType] = useState<QuestionTypes | null>(
        getAvailableType(memoizedQuestions),
    );

    useEffect(() => {
        const newAvailableType = getAvailableType(memoizedQuestions);
        setAvailableType(newAvailableType);
    }, [memoizedQuestions, getAvailableType]);

    const addQuestion = useCallback(() => {
        const defaultType = getAvailableType(memoizedQuestions);
        if (defaultType) {
            append(getDefaultQuestionValues(defaultType));
        }
    }, [append, getAvailableType, memoizedQuestions]);

    const onQuestionDelete = useCallback(
        (index: number) => {
            remove(index);
        },
        [remove],
    );

    return { addQuestion, onQuestionDelete, availableType };
};
