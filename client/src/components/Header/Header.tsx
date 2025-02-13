'use client';

import React, { useState } from 'react';
import { Toolbar, Container, useTheme, useMediaQuery } from '@mui/material';

import { useAuth } from '@/context/AuthProvider';
import { LeftSection, CentralSection, RightSection } from './sections';
import MobileMenu from './MobileMenu';
import StyledAppBar from './sections/StyledAppBar';

const Header = () => {
    const { token, user } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isCompactMode = useMediaQuery('(max-width: 600px)');
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <StyledAppBar>
            <Container
                maxWidth="xl"
                sx={{ padding: isMobile ? '0 4px' : '0 8px' }}
            >
                <Toolbar
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: isMobile
                            ? 'auto 1fr auto'
                            : '1fr minmax(200px, 600px) 1fr',
                        alignItems: 'center',
                        width: '100%',
                        gap: isMobile ? 1 : 2,
                        padding: isMobile ? '4px 0' : '8px 0',
                    }}
                >
                    <LeftSection
                        isMobile={isMobile}
                        isCompactMode={isCompactMode}
                        mobileOpen={mobileOpen}
                        setMobileOpen={setMobileOpen}
                        token={token}
                        user={user}
                    />
                    <CentralSection isMobile={isMobile} />
                    <RightSection
                        isMobile={isMobile}
                        isCompactMode={isCompactMode}
                        token={token}
                    />
                </Toolbar>
            </Container>
            <MobileMenu
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
                token={token}
                showAuthButtons={true}
                user={user}
            />
        </StyledAppBar>
    );
};

export default Header;
