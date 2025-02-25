import { Tag } from '@/types/tag';

export const checkIsTagSelected = (
    tags: Tag[],
    tagToCheck: Tag,
    key: keyof Tag,
) => {
    return tags.some((tag) => tag[key] === tagToCheck[key]);
};
