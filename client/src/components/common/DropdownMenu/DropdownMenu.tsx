import React from 'react';
import { Menu, MenuItem } from '@mui/material';

interface DropdownMenuProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    items: { label: string; onClick: () => void; icon?: React.ReactNode }[];
}

const DropdownMenu = ({ anchorEl, onClose, items }: DropdownMenuProps) => {
    const open = Boolean(anchorEl);

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            disableScrollLock
        >
            {items.map(({ label, onClick, icon }) => (
                <MenuItem
                    key={label}
                    onClick={() => {
                        onClick();
                        onClose();
                    }}
                >
                    {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
                    {label}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default DropdownMenu;
