import { Timestamps } from './base';
import { Template } from './template';

export interface User extends Timestamps {
  id: string;
    email: string;
    name: string;
    isAdmin?: boolean;
    isBlocked?: boolean;
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
