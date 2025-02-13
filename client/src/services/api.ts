import API_URL from '@/utils/config';

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

export async function getUserProfile(token: string) {
    const res = await fetch(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return res.json();
}
