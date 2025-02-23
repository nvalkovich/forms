import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Divider,
} from '@mui/material';
import { FiX } from 'react-icons/fi';
import {
    ThemeToggle,
    LanguageMenu,
    AuthButtons,
    ProfileButtons as ProfileMenu,
    NavigationItems,
} from '@/components/header';
import { useAuth } from '@/context/AuthProvider';

interface MobileMenuProps {
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
    showAuthButtons: boolean;
}

export const MobileMenu = ({
    mobileOpen,
    setMobileOpen,
    showAuthButtons,
}: MobileMenuProps) => {
    const { token, user } = useAuth();

    return (
        <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
        >
            <List sx={{ width: 250 }}>
                <ListItem>
                    <ListItemText primary="Forms" sx={{ fontWeight: 'bold' }} />
                    <IconButton onClick={() => setMobileOpen(false)}>
                        <FiX />
                    </IconButton>
                </ListItem>

                <Divider />

                <NavigationItems
                    token={token}
                    user={user}
                    isMobile={true}
                    setMobileOpen={setMobileOpen}
                />

                <Divider sx={{ my: 1 }} />

                <ThemeToggle isMobile={true} />

                <LanguageMenu isMobile={true} />

                {showAuthButtons && !token && (
                    <>
                        <Divider sx={{ my: 1 }} />
                        <AuthButtons isMobile={true} />
                    </>
                )}

                {token && (
                    <>
                        <Divider sx={{ my: 1 }} />
                        <ProfileMenu isMobile={true} />
                    </>
                )}
            </List>
        </Drawer>
    );
};
