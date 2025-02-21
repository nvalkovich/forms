import { Container, Box } from '@mui/material';
import { StyledPaper } from '@/components/base';

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
            <Box sx={{ width: '100%' }}>
                <StyledPaper
                    sx={{
                        width: '100%',
                        margin: 'auto',
                        maxWidth: '400px',
                        textAlign: 'center',
                    }}
                >
                    {children}
                </StyledPaper>
            </Box>
        </Container>
    );
};
