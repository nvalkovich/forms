import { useEffect, useState } from 'react';
import {
    Autocomplete,
    TextField,
    Chip,
    Box,
    IconButton,
    InputAdornment,
    FormControl,
    FormHelperText,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/Add';
import useTags from '@/hooks/useTags';
import { useTranslations } from 'next-intl';

const TagSelector = () => {
    const {
        control,
        watch,
        formState: { errors },
        setValue,
    } = useFormContext();

    const { tags, fetchTagsData, addTagData } = useTags();
    const [inputValue, setInputValue] = useState('');
    const selectedTags: string[] = watch('tags') || [];
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('TemplateBuilder');
    const validationTranslations = useTranslations('TemplateValidation');

    useEffect(() => {
        fetchTagsData();
    }, [fetchTagsData]);

    const handleAddTag = async (tag: string) => {
        const trimmedTag = tag.trim();
        if (!trimmedTag) return;

        if (selectedTags.includes(trimmedTag)) {
            toast.error(validationTranslations('thisTagSelected'));
            return;
        }

        const newTag = await addTagData(trimmedTag);
        if (newTag) {
            setValue('tags', [...selectedTags, newTag], {
                shouldValidate: true,
            });
            setInputValue('');
        }
    };

    const handleDeleteTag = (tagToDelete: string) => {
        setValue(
            'tags',
            selectedTags.filter((tag: string) => tag !== tagToDelete),
            { shouldValidate: true },
        );
    };

    return (
        <FormControl fullWidth error={!!errors.tags}>
            <Box
                sx={{ mb: 2, mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}
            >
                {selectedTags.map((tag: string, index: number) => (
                    <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                        sx={{ width: 'auto' }}
                    />
                ))}
            </Box>

            <Controller
                name="tags"
                control={control}
                defaultValue={[]}
                render={() => (
                    <Autocomplete
                        freeSolo
                        options={tags.filter(
                            (tag: string) => !selectedTags.includes(tag),
                        )}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) =>
                            setInputValue(newInputValue)
                        }
                        onChange={(event, newValue) => {
                            if (newValue) handleAddTag(newValue);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && inputValue.trim()) {
                                event.preventDefault();
                                handleAddTag(inputValue);
                            }
                        }}
                        open={isOpen}
                        onOpen={() => setIsOpen(true)}
                        onClose={() => setIsOpen(false)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={t('selectOrAddTags')}
                                placeholder={t('typeTag')}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {inputValue.trim() && (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            handleAddTag(
                                                                inputValue,
                                                            )
                                                        }
                                                        edge="end"
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            )}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />
                        )}
                    />
                )}
            />
            {errors.tags && (
                <FormHelperText>
                    {errors.tags.message as React.ReactNode}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default TagSelector;
