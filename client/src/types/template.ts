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

export enum TemplateFields {
    title = 'title',
    description = 'description',
    topicId = 'topicId',
    tags = 'tags',
    questions = 'questions',
    question = 'question',
    isPublic = 'isPublic',
    users = 'users',
}

export interface TemplateTableRow
    extends Pick<Template, 'id' | 'title' | 'description'> {
    rowNumber: number;
    topic: string;
    tags: string;
    createdAt: string;
    status: string;
    filledForms: number;
}

export enum TemplateTableFields {
    rowNumber = 'rowNumber',
    title = 'title',
    description = 'description',
    topic = 'topic',
    tags = 'tags',
    createdAt = 'createdAt',
    status = 'status',
    filledForms = 'filledForms',
}

export enum templateAvailabilityTypes {
    public = 'public',
    private = 'private',
}

export enum TemplateTableActionsTypes {
    edit = 'edit',
    delete = 'delete',
    open = 'open',
}

export enum TemplateTabs {
    template = 'template',
    generalSettings = 'generalSettings',
    questions = 'questions',
    results = 'results',
    analytics = 'analytics',
}

export const TemplateTabsOrder = [
    TemplateTabs.template,
    TemplateTabs.generalSettings,
    TemplateTabs.questions,
    TemplateTabs.results,
    TemplateTabs.analytics,
];
