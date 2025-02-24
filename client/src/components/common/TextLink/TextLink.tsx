import { Typography } from '@mui/material';
import { useNavigation } from '@/hooks/useNavigation';
import React from 'react';

interface TextLinkProps {
    text: string;
    linkText: string;
    href: string;
}

export const TextLink = ({ text, linkText, href }: TextLinkProps) => {
    const { Link } = useNavigation();

    return (
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            {text}{' '}
            <Link
                href={href}
                style={{
                    color: '#1976d2',
                    textDecoration: 'none',
                    fontWeight: 600,
                }}
            >
                {linkText}
            </Link>
        </Typography>
    );
};
