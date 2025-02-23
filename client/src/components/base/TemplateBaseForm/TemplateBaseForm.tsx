import React from 'react';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import {
    TextFieldWithValidation,
    TopicSelector,
    TagSelector,
    UserSelector,
} from '@/components/base';
import { TemplateFields } from '@/types/template';

interface TemplateBaseFormProps<T extends FieldValues> {
    methods: UseFormReturn<T>;
    isPublic: boolean;
    errors: Partial<Record<keyof T, { message?: string }>>;
    t: (key: string) => string;
    showUserSelector?: boolean;
}

export const TemplateBaseForm = <T extends FieldValues>({
    methods,
    isPublic,
    errors,
    t,
    showUserSelector = true,
}: TemplateBaseFormProps<T>) => {
    const { register } = methods;

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
                    <Switch
                        {...register(TemplateFields.isPublic as Path<T>)}
                        defaultChecked={isPublic}
                    />
                }
            />

            {!isPublic && showUserSelector && <UserSelector />}
        </Box>
    );
};
