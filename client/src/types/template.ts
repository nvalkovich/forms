import { Tag } from './tag';
import { Question } from './question';
import { User } from './user';

export interface Template {
    id: string;
    title: string;
    description: string;
    author: User;
    topic: { id: string; title: string };
    tags: Tag[];
    createdAt: string;
    updatedAt: string;
    isPublic: boolean;
    questions: Question[];
    users?: [];
}

export interface TemplateFormData {
    title: string;
    description?: string;
    topicId: string;
    tags: Tag[];
    questions: Question[];
    isPublic: boolean;
    users?: User[];
}

export interface CreateTemplateData
    extends Omit<TemplateFormData, 'tags' | 'users'> {
    tags: string[];
    users?: string[];
}

export enum TemplateFormFields {
    title = 'title',
    description = 'description',
    topicId = 'topicId',
    tags = 'tags',
    questions = 'questions',
    question = 'question',
    isPublic = 'isPublic',
    users = 'users',
}

export type TemplateFormBase = Omit<
    TemplateFormData,
    TemplateFormFields.questions
>;
export type TemplateFormQuestions = Pick<
    TemplateFormData,
    TemplateFormFields.questions
>;

export interface TemplateTableRow
    extends Pick<Template, 'id' | 'title' | 'description'> {
    rowNumber: number;
    topic: string;
    tags: string;
    createdAt: string;
    status: string;
}

export enum TemplateTableFields {
    rowNumber = 'rowNumber',
    title = 'title',
    description = 'description',
    topic = 'topic',
    tags = 'tags',
    createdAt = 'createdAt',
    status = 'status',
}

export enum TemplateAvailabilityTypes {
    public = 'public',
    accessRestricted = 'accessRestricted',
}

export enum TemplateTableActionsTypes {
    edit = 'edit',
    delete = 'delete',
}

export enum TemplateTabsTypes {
    template = 'template',
    generalSettings = 'generalSettings',
    questions = 'questions',
}

export const TemplateTabsOrder = [
    TemplateTabsTypes.template,
    TemplateTabsTypes.generalSettings,
    TemplateTabsTypes.questions,
];
