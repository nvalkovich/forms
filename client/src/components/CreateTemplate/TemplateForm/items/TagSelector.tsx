import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTags from '@/hooks/useTags';
import { useTranslations } from 'next-intl';
import { SelectableItems } from './SelectableItems/SelectableItems';
import { Tag } from '@/types';

const TagSelector = () => {
    const {
        watch,
        formState: { errors },
        setValue,
    } = useFormContext();

    const { tags, fetchTagsData, addTagData } = useTags();
    const selectedTags: Tag[] = watch('tags') || [];
    const t = useTranslations('TemplateBuilder');
    const validationTranslations = useTranslations('TemplateValidation');

    useEffect(() => {
        fetchTagsData();
    }, [fetchTagsData]);

    const handleAddTag = async (tag: Tag) => {
        if (selectedTags.some((t) => t.id === tag.id)) {
            toast.error(validationTranslations('thisTagSelected'));
            return;
        }

        setValue('tags', [...selectedTags, tag], { shouldValidate: true });
    };

    const handleDeleteTag = (tagToDelete: Tag) => {
        setValue(
            'tags',
            selectedTags.filter((tag) => tag.id !== tagToDelete.id),
            { shouldValidate: true },
        );
    };

    const handleAddNewTag = async (newTagName: string) => {
        const trimmedTag = newTagName.trim();
        if (!trimmedTag) return null;

        if (selectedTags.some((t) => t.name === trimmedTag)) {
            toast.error(validationTranslations('thisTagSelected'));
            return null;
        }

        const addedTag = await addTagData(trimmedTag);
        return addedTag;
    };

    const availableTags = tags.filter(
        (tag) => !selectedTags.some((t) => t.id === tag.id),
    );

    return (
        <SelectableItems
            name="tags"
            items={availableTags}
            selectedItems={selectedTags}
            onAdd={handleAddTag}
            onDelete={handleDeleteTag}
            onAddNew={handleAddNewTag}
            getOptionLabel={(item: string | Tag) => {
                if (typeof item === 'string') {
                    return item;
                }
                return item.name;
            }}
            getKey={(tag) => tag.id}
            placeholder={t('typeTag')}
            label={t('selectOrAddTags')}
            error={!!errors.tags}
            helperText={
                errors.tags ? validationTranslations('tagsRequired') : ''
            }
        />
    );
};

export default TagSelector;
