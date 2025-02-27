'use client';

import { useEffect } from 'react';
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    FormHelperText,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toastError } from '@/utils/toastify/utils';
import { useTopic } from '@/hooks/template/useTopic';
import { getTopicValueForView } from '@/utils/templateUtils';
import { TemplateFormFields } from '@/types/template';

export const TopicSelector = () => {
    const {
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const topicIdField = TemplateFormFields.topicId;

    const commonTranslations = useTranslations('TemplateBuilder');
    const topicsTranslations = useTranslations('Topics');
    const selectedTopic = watch(topicIdField) || '';

    const { topics, loading, error } = useTopic(undefined, true);

    useEffect(() => {
        if (error) {
            toastError(commonTranslations('errorFetchingTopics'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setValue(topicIdField, event.target.value, { shouldValidate: true });
    };

    const selectConfig = {
        topicLabel: 'topic',
        id: 'topic-select',
    }

    return (
        <FormControl fullWidth variant="outlined" error={!!errors.topicId}>
            <InputLabel id={selectConfig.topicLabel}>
                {commonTranslations('topic')}
            </InputLabel>
            <Select
                labelId={selectConfig.topicLabel}
                id={selectConfig.id}
                value={selectedTopic}
                onChange={handleChange}
                label={commonTranslations('topic')}
                disabled={loading}
            >
                {topics.map((topic) => (
                    <MenuItem key={topic.id} value={topic.id}>
                        {getTopicValueForView(topic.title, topicsTranslations)}
                    </MenuItem>
                ))}
            </Select>
            {errors.topicId?.message && (
                <FormHelperText>
                    {String(errors.topicId.message)}
                </FormHelperText>
            )}
        </FormControl>
    );
};
