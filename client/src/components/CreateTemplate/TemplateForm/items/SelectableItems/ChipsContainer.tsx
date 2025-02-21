import { Box, Chip } from '@mui/material';

interface ChipsContainerProps<T> {
    items: T[];
    getKey: (item: T) => string | number;
    getOptionLabel: (item: T) => string;
    onDelete: (item: T) => void;
}

export const ChipsContainer = <T extends object>({
    items,
    getKey,
    getOptionLabel,
    onDelete,
}: ChipsContainerProps<T>) => (
    <Box sx={{ mb: 2, mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {items.map((item) => (
            <Chip
                key={getKey(item)}
                label={getOptionLabel(item)}
                onDelete={() => onDelete(item)}
            />
        ))}
    </Box>
);
