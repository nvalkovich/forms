import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { TemplateFormData } from '@/types';

export const useTemplateSubmit = (methods: UseFormReturn<TemplateFormData>) => {
    const onSubmit = useCallback((data: TemplateFormData) => {
        console.log('submit data:', JSON.stringify(data, null, 2));
    }, []);

    return {
        handleSubmit: methods.handleSubmit(onSubmit),
    };
};
