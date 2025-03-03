'use client';

import { UserAdminPanel } from '@/components/pages/UserAdminPanel';
import { PrivateRoute } from '@/components/routes';

const AdminPage = () => {
    return (
        <PrivateRoute adminOnly>
            <UserAdminPanel />
        </PrivateRoute>
    );
};

export default AdminPage;
