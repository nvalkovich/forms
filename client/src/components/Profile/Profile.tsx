import React from 'react';
import { Container } from '@mui/material';
import { styled } from '@mui/system';
import UserData from './items/UserData';
import { User } from '@/types';
import ProfileTabs from './items/ProfileTabs';

const StyledContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
    },
}));

interface ProfileData {
    user: User;
}

const Profile = ({ user }: ProfileData) => {
    return (
        <StyledContainer maxWidth="lg">
            <UserData user={user} />
            <ProfileTabs />
        </StyledContainer>
    );
};

export default Profile;
