import React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import {
    UseFormReturn,
    FieldValues,
    Path,
    useController,
} from 'react-hook-form';
import { TextFieldWithValidation } from '@/components/common';
import {
    TopicSelector,
    TagSelector,
    UserSelector,
} from '@/components/template';
import { TemplateFormFields } from '@/types/template';
import { useTranslationsHook } from '@/i18n/routing';

interface TemplateBaseFormProps<T extends FieldValues> {
    methods: UseFormReturn<T>;
    isPublic: boolean;
    errors: Partial<Record<keyof T, { message?: string }>>;
    t: useTranslationsHook;
    showUserSelector?: boolean;
}

export const TemplateBaseForm = <T extends FieldValues>({
    methods,
    errors,
    t,
    showUserSelector = true,
}: TemplateBaseFormProps<T>) => {
    const { register, control } = methods;
    const { field } = useController({
        name: TemplateFormFields.isPublic as Path<T>,
        control,
    });

    return (
        <Box component="form" sx={{ width: '100%' }}>
            <TextFieldWithValidation
                label={t('titleLabel')}
                register={register('title' as Path<T>)}
                error={!!errors.title}
                helperText={errors.title?.message}
                placeholder={t('titlePlaceholder')}
            />

            <TextFieldWithValidation
                label={t('descriptionLabel')}
                register={register('description' as Path<T>)}
                error={!!errors.description}
                helperText={errors.description?.message}
                placeholder={t('descriptionPlaceholder')}
            />

            <TopicSelector />
            <TagSelector />

            <FormControlLabel
                label={t('publicTemplate')}
                sx={{ mt: 3 }}
                control={
                    <Switch checked={field.value} onChange={field.onChange} />
                }
            />

            {!field.value && showUserSelector && <UserSelector />}
        </Box>
    );
};
