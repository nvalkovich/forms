export interface User {
    id: string;
    email: string;
    name: string;
    isAdmin?: boolean;
    isBlocked?: boolean;
    createdAt: string;
    updatedAt: string;
}

export enum AuthType {
    login = 'login',
    register = 'register',
}

export enum AdminActionsTypes {
    block = 'block',
    unblock = 'unblock',
    makeAdmin = 'makeAdmin',
    revokeAdminRights = 'revokeAdminRights',
    delete = 'delete',
}

export enum UserRoles {
    admin = 'Admin',
    user = 'User',
}

export enum UserStatus {
    blocked = 'Blocked',
    active = 'Active',
}
