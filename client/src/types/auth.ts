import { User } from './user';

export enum AuthType {
    login = 'login',
    register = 'register',
}

export enum AuthLinksKeys {
    noAccount = 'noAccount',
    haveAccount = 'haveAccount',
}

export interface AuthFormData {
    name?: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
