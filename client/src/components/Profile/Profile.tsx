import React from 'react';
import { Container } from '@mui/material';
import UserData from './UserData/UserData';
import { User } from '@/types/user';
import ProfileTabs from './ProfileTabs/ProfileTabs';
import { StyledPaper } from '../base';

interface ProfileData {
    user: User;
}

const Profile = ({ user }: ProfileData) => {
    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <StyledPaper>
                <UserData user={user} />
                <ProfileTabs />
            </StyledPaper>
        </Container>
    );
};

export default Profile;
