import API_URL from '@/utils/config';
import { User } from '@/types';

async function handleResponse(res: Response) {
    const data = await res.json();
    if (!res.ok) {
        throw new Error(
            Array.isArray(data.message)
                ? data.message.join('\n')
                : data.message,
        );
    }
    return data;
}
export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
}

export async function registerUser(
    name: string,
    email: string,
    password: string,
) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    return handleResponse(res);
}

export async function updateUserStatus(
    userId: string,
    updates: { isBlocked?: boolean; isAdmin?: boolean },
) {
    const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
    });
    return res.json();
}

export async function deleteUser(userId: string) {
    const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
    });
    return res.json();
}

export async function getUsers(): Promise<User[]> {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
}

export async function getUser(id: string) {
    const res = await fetch(`${API_URL}/users/${id}`);
    return res.json();
}
