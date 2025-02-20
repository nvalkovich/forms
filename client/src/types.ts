export interface User {
    id: string;
    email: string;
    name: string;
    isAdmin?: boolean;
    isBlocked?: boolean;
    createdAt: Date;
    updatedAt: Date;
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

export enum QuestionTypes {
    singleLineString = 'singleLineString',
    multiLineString = 'multiLineString',
    positiveInteger = 'positiveInteger',
    checkbox = 'checkbox',
}

export type QuestionFieldValue = string | number | string[];

export interface QuestionField {
    value: QuestionFieldValue;
}

export interface Question {
    id?: string;
    title: string;
    type: QuestionTypes;
    description?: string;
    required: boolean;
    showInResults: boolean;
    options: { value: string }[];
}

export interface TemplateFormData {
    title: string;
    description?: string;
    topicId: string;
    tags: string[];
    questions: Question[];
    isPublic: boolean;
}

export enum TemplateFields {
    title = 'title',
    description = 'description',
    topicId = 'topicId',
    tags = 'tags',
    questions = 'questions',
    question = 'question',
    isPublic = 'isPublic',
}

export enum TemplateQuestionFields {
    title = 'title',
    description = 'description',
    type = 'type',
    options = 'options',
    required = 'required',
    showInResults = 'showInResults',
}

export interface Tag {
    id: string;
    name: string;
}

export enum TextFieldTypes {
    text = 'text',
    number = 'number',
    password = 'password',
    email = 'email',
}

export enum QuestionRendererTypes {
    preview = 'preview',
    input = 'input',
}

export enum Topics {
    quiz = 'quiz',
    education = 'education',
    other = 'other',
}
