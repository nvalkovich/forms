'use client';

import React from 'react';
import { FormProvider } from 'react-hook-form';
import { LivePreview } from './LivePreview/LivePreview';
import { Container, Stack, Box } from '@mui/material';
import { useTemplateForm } from '@/hooks/useTemplateForm';
import TemplateForm from './TemplateForm/TemplateForm';
import { useTemplateSubmit } from '@/hooks/useTemplateSubmit';

export const FormTemplateBuilder = () => {
    const { methods, fields, append, remove } = useTemplateForm();
    const { handleSubmit } = useTemplateSubmit(methods);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <Box flex={1}>
                    <FormProvider {...methods}>
                        <TemplateForm
                            methods={methods}
                            handleSubmit={handleSubmit}
                            fields={fields}
                            remove={remove}
                            append={append}
                        />
                    </FormProvider>
                </Box>
                <Box flex={1}>
                    <LivePreview watch={methods.watch} fields={fields} />
                </Box>
            </Stack>
        </Container>
    );
};
