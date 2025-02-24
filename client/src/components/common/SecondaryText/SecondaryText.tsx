import { Typography } from '@mui/material';

const defaultStyles = { my: 1, wordWrap: 'break-word' };

interface SecondaryTextData {
    content: string;
    sx?: object;
}

export const SecondaryText = ({ content, sx = {} }: SecondaryTextData) => {
    return (
        <Typography color="text.secondary" sx={{ ...defaultStyles, ...sx }}>
            {content}
        </Typography>
    );
};
