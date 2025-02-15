import { Typography, Paper, Box } from '@mui/material';
import { User } from '@/types';

interface UserDataProps {
    user: User;
}

const UserData = ({ user }: UserDataProps) => {
    return (
        <Paper elevation={3} sx={{ p: 3, mb: 5 }}>
            <Box display="flex" flexDirection="column" gap={2}>
                <Box>
                    <Typography variant="h5" gutterBottom>
                        {user.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {user.email}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};

export default UserData;
