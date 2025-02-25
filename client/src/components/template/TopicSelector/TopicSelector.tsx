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

export const TopicSelector = () => {
    const {
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();
    const commonTranslations = useTranslations('TemplateBuilder');
    const topicsTranslations = useTranslations('Topics');
    const selectedTopic = watch('topicId') || '';

    const { topics, loading, error } = useTopic(undefined, true);

    useEffect(() => {
        if (error) {
            toastError(commonTranslations('errorFetchingTopics'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setValue('topicId', event.target.value, { shouldValidate: true });
    };

    return (
        <FormControl fullWidth variant="outlined" error={!!errors.topicId}>
            <InputLabel id="topic-label">
                {commonTranslations('topic')}
            </InputLabel>
            <Select
                labelId="topic-label"
                id="topic-select"
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
