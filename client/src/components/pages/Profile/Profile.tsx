import React from 'react';
import { ProfileUserData } from './ProfileUserData';
import { ProfileTabs } from './ProfileTabs';
import { StyledContainer } from '@/components/common';

const Profile = () => {
    return (
        <StyledContainer>
            <ProfileUserData />
            <ProfileTabs />
        </StyledContainer>
    );
};

export default Profile;
