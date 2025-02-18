import { Ibarra_Real_Nova } from "next/font/google";

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

export interface Question {
    id?: string;
    title: string;
    type: string;
    description?: string;
    required: boolean;
    showInResults: boolean;
}

export interface TemplateFormData {
    title: string;
    description?: string;
    image?: string;
    isPublic?: boolean
    topicId: string;
    questions: Question[];

}
