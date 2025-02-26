'use client';

import { Profile } from '@/components/pages/Profile';
import { PrivateRoute } from '@/components/routes';

export default function ProfilePage() {
    return (
        <PrivateRoute>
            <Profile />;
        </PrivateRoute>
    );
}
