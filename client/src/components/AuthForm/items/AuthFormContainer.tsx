import { Container, Box } from '@mui/material';

interface AuthFormContainerProps {
    children: React.ReactNode;
}

export const AuthFormContainer = ({ children }: AuthFormContainerProps) => {
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
            <Box sx={{ width: '100%' }}>{children}</Box>
        </Container>
    );
};
