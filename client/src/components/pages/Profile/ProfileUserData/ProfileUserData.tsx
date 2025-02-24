import { Typography, Paper, Box, Tooltip } from '@mui/material';
import { LuUserCog } from 'react-icons/lu';
import { TbLock } from 'react-icons/tb';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthProvider';

export const ProfileUserData = () => {
    const t = useTranslations('Profile');
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box display="flex" flexDirection="column" gap={2}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h5" gutterBottom>
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
                <Typography variant="body1" color="textSecondary">
                    {user.email}
                </Typography>
            </Box>
        </Paper>
    );
};
