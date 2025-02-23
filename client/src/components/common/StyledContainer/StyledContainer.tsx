import { StyledPaper } from '@/components/common';
import { Container as MuiContainer } from '@mui/material';

export enum ContainerSizes {
    large = 'lg',
    medium = 'md',
    small = 'sm',
}

const defaultStyles = { my: 4, px: { xs: 0, sm: 2, md: 4 } };

interface ContainerData {
    children: React.ReactNode;
    maxWidth?: ContainerSizes;
    sx?: object;
}

export const StyledContainer = ({
    children,
    maxWidth = ContainerSizes.large,
    sx = {},
}: ContainerData) => {
    return (
        <MuiContainer maxWidth={maxWidth} sx={{ ...defaultStyles, ...sx }}>
            <StyledPaper>{children}</StyledPaper>
        </MuiContainer>
    );
};
