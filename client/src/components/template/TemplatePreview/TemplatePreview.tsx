import { Box, Divider } from '@mui/material';
import { QuestionRendererTypes } from '@/types/common';
import { QuestionRenderer } from '@/components/form';
import { Title, StyledPaper, SecondaryText } from '@/components/common';
import { useTranslations } from 'next-intl';
import { Question } from '@/types/question';
import { TagsView } from '../TagsView/TagsView';
import { TopicView } from '../TopicView/TopicView';

interface TemplatePreviewProps {
    title: string;
    description?: string;
    topic?: string;
    tags?: { name: string }[];
    questions: Question[];
    isLoading?: boolean;
}

export const TemplatePreview = ({
    title,
    description,
    topic,
    tags = [],
    questions,
    isLoading = false,
}: TemplatePreviewProps) => {
    const commonTranslations = useTranslations('LivePreview');

    return (
        <StyledPaper
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                wordBreak: 'break-word',
            }}
        >
            <Title title={title || commonTranslations('untitled')} />
            {description && (
                <SecondaryText content={description} />
            )}

            <Box>
                <TopicView topic={topic} isLoading={isLoading} />
                <TagsView tags={tags} />
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box>
                {questions.map((question, index) => (
                    <QuestionRenderer
                        key={index}
                        question={question}
                        mode={QuestionRendererTypes.preview}
                    />
                ))}
            </Box>
        </StyledPaper>
    );
};
