export interface User {
    id: string;
    email: string;
    name: string;
    isAdmin?: boolean;
}

export enum AuthType {
    login = 'login',
    register = 'register',
}
