import API_URL from '@/utils/config';
import { CreateTemplateData, TemplateFormData } from '@/types/template';
import { User } from '@/types/user';

export enum ApiRoutes {
    users = '/users',
    topic = '/topics',
    tags = '/tags',
    templates = '/templates',
    auth = '/auth',
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

const defaultHeaders = {
    'Content-Type': 'application/json',
};

export function createRoute(
    path: string,
    params: Record<string, string>,
): string {
    return Object.entries(params).reduce(
        (acc, [key, value]) => acc.replace(`{${key}}`, value),
        path,
    );
}

export const routes = {
    login: `${ApiRoutes.auth}/login`,
    register: `${ApiRoutes.auth}/register`,
    userById: `${ApiRoutes.users}/{id}`,
    users: ApiRoutes.users,
    topics: ApiRoutes.topic,
    topicById: `${ApiRoutes.topic}/{id}`,
    tags: ApiRoutes.tags,
    templates: ApiRoutes.templates,
};

const fetchRequest = async (
    endpoint: string,
    method: HttpMethod = HttpMethod.GET,
    body?: unknown,
    token?: string,
) => {
    const headers: HeadersInit = {
        ...defaultHeaders,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const options: RequestInit = {
        method,
        headers,
        ...(body ? { body: JSON.stringify(body) } : {}),
    };

    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            Array.isArray(data.message)
                ? data.message.join('\n')
                : data.message,
        );
    }

    return data;
};

export const loginUser = (email: string, password: string) =>
    fetchRequest(routes.login, HttpMethod.POST, { email, password });

export const registerUser = (name: string, email: string, password: string) =>
    fetchRequest(routes.register, HttpMethod.POST, { name, email, password });

export const updateUserStatus = (
    userId: string,
    updates: { isBlocked?: boolean; isAdmin?: boolean },
) =>
    fetchRequest(
        createRoute(routes.userById, { id: userId }),
        HttpMethod.PATCH,
        updates,
    );

export const deleteUser = (userId: string) =>
    fetchRequest(
        createRoute(routes.userById, { id: userId }),
        HttpMethod.DELETE,
    );

export const getUsers = (): Promise<User[]> => fetchRequest(routes.users);

export const getUser = (id: string) =>
    fetchRequest(createRoute(routes.userById, { id }));

export const getTopics = () => fetchRequest(routes.topics);

export const getTopicNameById = (id: string) =>
    fetchRequest(createRoute(routes.topicById, { id }));

export const fetchTags = () => fetchRequest(routes.tags);

export const addTag = (tag: string) =>
    fetchRequest(routes.tags, HttpMethod.POST, { name: tag });

export const createTemplate = (data: CreateTemplateData, token: string) =>
    fetchRequest(routes.templates, HttpMethod.POST, data, token);

export const getTemplates = (token?: string) =>
    fetchRequest(routes.templates, HttpMethod.GET, undefined, token);

export const getTemplateById = (id: string) =>
    fetchRequest(createRoute(`${ApiRoutes.templates}/{id}`, { id }));

export const updateTemplate = (
    id: string,
    data: Partial<TemplateFormData>,
    token: string,
) =>
    fetchRequest(
        createRoute(`${ApiRoutes.templates}/{id}`, { id }),
        HttpMethod.PATCH,
        data,
        token,
    );

export const deleteTemplate = (id: string, token: string) =>
    fetchRequest(
        createRoute(`${ApiRoutes.templates}/{id}`, { id }),
        HttpMethod.DELETE,
        undefined,
        token,
    );
