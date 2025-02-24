import { Tab, Tabs as MuiTabs } from '@mui/material';
import React from 'react';

interface TabsProps {
    labels: string[];
    ariaLabel: string;
    onChange?: (event: React.SyntheticEvent, newValue: number) => void;
    value?: number;
}

export const Tabs = ({ labels, onChange, ariaLabel, value = 0 }: TabsProps) => {
    return (
        <MuiTabs value={value} onChange={onChange} aria-label={ariaLabel}>
            {labels.map((label, index) => (
                <Tab key={index} label={label} id={`tab-${index}`} />
            ))}
        </MuiTabs>
    );
};
