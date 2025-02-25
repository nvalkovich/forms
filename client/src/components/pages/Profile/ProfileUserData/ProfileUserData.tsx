import {
    Typography,
    Paper,
    Box,
    Tooltip,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { LuUserCog } from 'react-icons/lu';
import { TbLock } from 'react-icons/tb';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthProvider';

export const ProfileUserData = () => {
    const t = useTranslations('Profile');
    const { user } = useAuth();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    if (!user) {
        return null;
    }

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Box display="flex" flexDirection="column" gap={2}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                >
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                            maxWidth: '100%',
                            fontSize: isSmallScreen ? '1.25rem' : '1.5rem',
                        }}
                    >
                        {user.name}
                    </Typography>
                    <Box display="flex" gap={2}>
                        {user.isAdmin && (
                            <Tooltip title={t('admin')} arrow>
                                <LuUserCog size={20} color="gray" />
                            </Tooltip>
                        )}
                        {user.isBlocked && (
                            <Tooltip title={t('blocked')} arrow>
                                <TbLock size={20} color="gray" />
                            </Tooltip>
                        )}
                    </Box>
                </Box>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        maxWidth: '100%',
                    }}
                >
                    {user.email}
                </Typography>
            </Box>
        </Paper>
    );
};
