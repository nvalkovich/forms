import { Box, Typography } from '@mui/material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TemplateFormFields as FormFields } from '@/types/template';
import { useTranslations } from 'next-intl';
import { useTemplates } from '@/hooks/template/useTemplates';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { getGeneralInfoSchema } from '@/utils/yup/templateValidationSchema';
import { Loader, Button } from '@/components/common';
import { TemplateBaseForm } from '@/components/template';
import { TemplateFormBase } from '@/types/template';
import { ButtonTypes } from '@/types/common';

interface GeneralSettingsProps {
    isAuthor: boolean;
    onSubmit: (data: TemplateFormBase) => void;
}

export const GeneralSettings = ({ onSubmit }: GeneralSettingsProps) => {
    const t = useTranslations('TemplateBuilder');
    const templateTranslations = useTranslations('TemplatePage');
    const templateValidationsTranslations =
        useTranslations('TemplateValidation');
    const params = useParams();
    const id = params.id as string;

    const { template, loading } = useTemplates(id);
    const schema = getGeneralInfoSchema(templateValidationsTranslations);

    const methods = useForm<TemplateFormBase>({
        resolver: yupResolver<TemplateFormBase>(schema),
        defaultValues: {
            title: '',
            description: '',
            isPublic: false,
            topicId: '',
            tags: [],
            users: [],
        },
    });

    const { handleSubmit, watch, reset } = methods;
    const isPublic = watch(FormFields.isPublic);

    useEffect(() => {
        if (template) {
            reset({
                title: template.title,
                description: template.description,
                isPublic: template.isPublic,
                topicId: template.topic.id,
                tags: template.tags,
                users: template.users,
            });
        }
    }, [template, reset]);

    const handleFormSubmit: SubmitHandler<TemplateFormBase> = (data) => {
        onSubmit(data);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <FormProvider {...methods}>
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {templateTranslations('generalSettings')}
                </Typography>
                <TemplateBaseForm<TemplateFormBase>
                    methods={methods}
                    isPublic={isPublic}
                    errors={methods.formState.errors}
                    t={t}
                />
                <Button
                    type={ButtonTypes.submit}
                    label={templateTranslations('updateTemplate')}
                    onClick={handleSubmit(handleFormSubmit)}
                />
            </Box>
        </FormProvider>
    );
};
