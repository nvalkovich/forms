import { Template } from './template';

export interface User {
    id: string;
    email: string;
    name: string;
    isAdmin?: boolean;
    isBlocked?: boolean;
    createdAt: Date;
    updatedAt: Date;
    templates: Template[];
}

export enum UserRoles {
    admin = 'Admin',
    user = 'User',
}

export enum UserStatus {
    blocked = 'Blocked',
    active = 'Active',
}
