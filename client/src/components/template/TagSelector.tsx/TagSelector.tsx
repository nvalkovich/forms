import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import useTags from '@/hooks/template/useTags';
import useTagSelector from '@/hooks/template/useTagSelector';
import { useTranslations } from 'next-intl';
import { SelectableItems } from '@/components/common';
import { TemplateFormFields } from '@/types/template';

export const TagSelector = () => {
    const {
        formState: { errors },
    } = useFormContext();
    const { tags, fetchTagsData, addTagData } = useTags();
    const { selectedTags, handleAddTag, handleDeleteTag, handleAddNewTag } =
        useTagSelector();

    const t = useTranslations('TemplateBuilder');
    const validationTranslations = useTranslations('TemplateValidation');

    useEffect(() => {
        fetchTagsData();
    }, [fetchTagsData]);

    const availableTags = useMemo(
        () => tags.filter((tag) => !selectedTags.some((t) => t.id === tag.id)),
        [tags, selectedTags],
    );

    return (
        <SelectableItems
            name={TemplateFormFields.tags}
            items={availableTags}
            selectedItems={selectedTags}
            onAdd={handleAddTag}
            onDelete={handleDeleteTag}
            onAddNew={(name) => handleAddNewTag(name, addTagData)}
            getOptionLabel={(item) =>
                typeof item === 'string' ? item : item.name
            }
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
