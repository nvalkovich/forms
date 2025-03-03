import { Stack } from '@mui/material';
import { HashtagIcon } from '@/components/icons';
import { Chip, ChipSizes, SecondaryText } from '@/components/common';
import { useTranslations } from 'next-intl';

interface TagsViewProps {
    tags?: { name: string }[];
    viewWithIcon?: boolean;
}

export const TagsView = ({ tags = [], viewWithIcon = true }: TagsViewProps) => {
    const commonTranslations = useTranslations('LivePreview');

    return (
        <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            alignItems="center"
            rowGap={1}
        >
            {viewWithIcon && <HashtagIcon />}
            {tags.length > 0 ? (
                tags.map((tag, index) => (
                    <Chip key={index} label={tag.name} size={ChipSizes.small} />
                ))
            ) : (
                <SecondaryText content={commonTranslations('noTagsSelected')} />
            )}
        </Stack>
    );
};
