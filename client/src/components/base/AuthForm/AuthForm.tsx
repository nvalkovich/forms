import { Box, Container } from '@mui/material';
import { Title } from '@/components/base';
import { StyledPaper } from '@/components/base';

interface AuthFormProps {
    title: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}

export const AuthForm = ({ onSubmit, children, title }: AuthFormProps) => {
    return (
        <Container
            component="main"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
            }}
        >
            <Box sx={{ width: '100%' }}>
                <StyledPaper
                    sx={{
                        width: '100%',
                        margin: 'auto',
                        maxWidth: '400px',
                        textAlign: 'center',
                    }}
                >
                    <Title title={title} />
                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        sx={{ width: '100%' }}
                        noValidate
                    >
                        {children}
                    </Box>
                </StyledPaper>
            </Box>
        </Container>
    );
};
