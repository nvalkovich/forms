import {
    MenuItem,
    Select,
    Typography,
    Box,
    SelectChangeEvent,
} from '@mui/material';
import { UserSortBy } from '@/utils/userSelectorUtils';
import { useTranslationsHook } from '@/i18n/routing';

interface SortSelectorProps {
    sortBy: UserSortBy;
    onSortChange: (value: UserSortBy) => void;
    t: useTranslationsHook;
}

export const SortSelector = ({
    sortBy,
    onSortChange,
    t,
}: SortSelectorProps) => {
    const handleChange = (event: SelectChangeEvent<UserSortBy>) => {
        onSortChange(event.target.value as UserSortBy);
    };

    return (
        <Box
            sx={{
                mb: 3,
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            }}
        >
            <Typography>{t('sortBy')}:</Typography>
            <Select
                value={sortBy}
                onChange={handleChange}
                size="small"
                sx={{
                    minWidth: 120,
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    height: '36px',
                }}
            >
                <MenuItem value={UserSortBy.Name}>{t('name')}</MenuItem>
                <MenuItem value={UserSortBy.Email}>{t('email')}</MenuItem>
            </Select>
        </Box>
    );
};
