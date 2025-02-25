import { useFormContext } from 'react-hook-form';
import { toastError } from '@/utils/toastify/utils';
import { Tag } from '@/types/tag';
import { TemplateFormFields } from '@/types/template';
import { useTranslations } from 'next-intl';
import { checkIsTagSelected } from '@/utils/tagUtils';

enum TagFields {
    id = 'id',
    name = 'name',
}

const useTagSelector = () => {
    const { watch, setValue } = useFormContext();
    const t = useTranslations('TemplateValidation');

    const selectedTags: Tag[] = watch(TemplateFormFields.tags) || [];

    const updateTags = (newTags: Tag[]) => {
        setValue(TemplateFormFields.tags, newTags, { shouldValidate: true });
    };

    const handleAddTag = (tag: Tag) => {
        if (checkIsTagSelected(selectedTags, tag, TagFields.id)) {
            toastError(t('thisTagSelected'));
            return;
        }
        updateTags([...selectedTags, tag]);
    };

    const handleDeleteTag = (tagToDelete: Tag) => {
        updateTags(selectedTags.filter((tag) => tag.id !== tagToDelete.id));
    };

    const handleAddNewTag = async (
        newTagName: string,
        addTagData: (name: string) => Promise<Tag | null>,
    ) => {
        const trimmedTag = newTagName.trim();

        if (
            checkIsTagSelected(
                selectedTags,
                { name: trimmedTag } as Tag,
                TagFields.name,
            )
        ) {
            toastError(t('thisTagSelected'));
            return null;
        }

        const addedTag = await addTagData(trimmedTag);
        if (addedTag) updateTags([...selectedTags, addedTag]);
        return addedTag;
    };

    return { selectedTags, handleAddTag, handleDeleteTag, handleAddNewTag };
};

export default useTagSelector;
