import React, { useEffect } from 'react';
import {
    Select,
    MenuItem,
    IconButton,
    Typography,
    Stack,
    Button,
    FormControlLabel,
    Switch,
    Box,
    FormControl,
} from '@mui/material';
import {
    useFormContext,
    useFieldArray,
    FieldError,
    Path,
} from 'react-hook-form';
import {
    TemplateFormData,
    QuestionTypes,
    TemplateQuestionFields,
    TemplateFields,
} from '@/types';
import { getDefaultQuestionType } from '@/utils/templateUtils';
import { TextFieldWithValidation } from '../../../base';
import { StyledPaper } from '../../../base/StyledPaper/StyledPaper';
import { TrashIcon, PlusIcon } from '../../../icons';
import { useTranslations } from 'next-intl';
import { MAX_QUESTIONS_OF_TYPE } from '@/constants';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface QuestionFieldProps {
    index: number;
    remove: (index: number) => void;
}

const getFieldPath = <T extends TemplateQuestionFields>(
    index: number,
    field: T,
): Path<TemplateFormData> =>
    `questions.${index}.${field}` as Path<TemplateFormData>;

export const QuestionField: React.FC<QuestionFieldProps> = ({
    index,
    remove,
}) => {
    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<TemplateFormData>();

    const {
        fields: options,
        append: appendOption,
        remove: removeOption,
    } = useFieldArray({
        control,
        name: getFieldPath(
            index,
            TemplateQuestionFields.options,
        ) as `questions.${number}.options`,
    });

    const questionsField = TemplateFields.questions;
    const questionType = watch(
        getFieldPath(index, TemplateQuestionFields.type),
    ) as QuestionTypes;
    const allQuestions = watch(
        questionsField,
    ) as TemplateFormData[typeof questionsField];

    const t = useTranslations('TemplateBuilder');
    const livePreviewTranslations = useTranslations('LivePreview');

    const isQuestionTypeDisabled = (type: QuestionTypes): boolean => {
        return (
            allQuestions.filter((q) => q.type === type).length >=
            MAX_QUESTIONS_OF_TYPE
        );
    };

    const defaultType = getDefaultQuestionType(allQuestions || []);

    useEffect(() => {
        if (questionType === QuestionTypes.checkbox && options.length === 0) {
            appendOption({ value: '' });
        }
    }, [questionType, options.length, appendOption]);


    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: `question-${index}` });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <StyledPaper
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            sx={{ mt: 4, mb: 4 }}
        >
            <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1">
                    {`${t('question')} ${index + 1}`}
                </Typography>
                <IconButton
                    onClick={() => remove(index)}
                    size="small"
                    sx={{ ml: 'auto' }}
                >
                    <TrashIcon />
                </IconButton>
            </Box>

            <TextFieldWithValidation
                label={t('questionTitleLabel')}
                register={register(
                    getFieldPath(index, TemplateQuestionFields.title),
                )}
                error={!!errors.questions?.[index]?.title}
                helperText={
                    (errors.questions?.[index]?.title as FieldError)?.message
                }
                placeholder={t('questionTitlePlaceholder')}
            />

            <TextFieldWithValidation
                label={t('descriptionLabel')}
                register={register(
                    getFieldPath(index, TemplateQuestionFields.description),
                )}
                error={!!errors.questions?.[index]?.description}
                helperText={
                    (errors.questions?.[index]?.description as FieldError)
                        ?.message
                }
                placeholder={t('questionDescriptionPlaceholder')}
                multiline
            />

            <FormControl fullWidth className="mb-4">
                <Select
                    value={questionType || defaultType}
                    onChange={(e) =>
                        setValue(
                            getFieldPath(index, TemplateQuestionFields.type),
                            e.target.value as QuestionTypes,
                        )
                    }
                    error={!!errors.questions?.[index]?.type}
                >
                    {Object.values(QuestionTypes).map((type) => (
                        <MenuItem
                            key={type}
                            value={type}
                            disabled={isQuestionTypeDisabled(type)}
                        >
                            {t(type)}
                        </MenuItem>
                    ))}
                </Select>
                {errors.questions?.[index]?.type && (
                    <Typography color="error" variant="body2">
                        {
                            (errors.questions?.[index]?.type as FieldError)
                                ?.message
                        }
                    </Typography>
                )}
            </FormControl>

            {questionType === QuestionTypes.checkbox && (
                <Box mb={1}>
                    <Stack spacing={0}>
                        {options.map((option, optionIndex) => (
                            <Box
                                key={option.id}
                                display="flex"
                                alignItems="center"
                            >
                                <TextFieldWithValidation
                                    label={`${t('option')} ${optionIndex + 1}`}
                                    register={register(
                                        `${getFieldPath(index, TemplateQuestionFields.options)}.${optionIndex}.value` as Path<TemplateFormData>,
                                    )}
                                    error={
                                        !!errors.questions?.[index]?.options?.[
                                            optionIndex
                                        ]?.value
                                    }
                                    helperText={
                                        (
                                            errors.questions?.[index]
                                                ?.options?.[optionIndex]
                                                ?.value as FieldError
                                        )?.message
                                    }
                                    placeholder={t('questionOptionPlaceholder')}
                                />
                                <IconButton
                                    onClick={() => removeOption(optionIndex)}
                                    size="small"
                                >
                                    <TrashIcon />
                                </IconButton>
                            </Box>
                        ))}
                    </Stack>
                    <Button
                        startIcon={<PlusIcon />}
                        onClick={() => appendOption({ value: '' })}
                        sx={{ color: 'text.secondary' }}
                    >
                        {t('addOption')}
                    </Button>
                </Box>
            )}

            <Box mt={2}>
                <FormControlLabel
                    control={
                        <Switch
                            {...register(
                                getFieldPath(
                                    index,
                                    TemplateQuestionFields.required,
                                ),
                            )}
                            defaultChecked={false}
                        />
                    }
                    label={livePreviewTranslations('requiredToFill')}
                />

                <FormControlLabel
                    control={
                        <Switch
                            {...register(
                                getFieldPath(
                                    index,
                                    TemplateQuestionFields.showInResults,
                                ),
                            )}
                            defaultChecked={true}
                        />
                    }
                    label={livePreviewTranslations('showInResults')}
                />
            </Box>
        </StyledPaper>
    );
};

export default QuestionField;