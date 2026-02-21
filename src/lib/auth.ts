import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'admin_session';

export async function login(password: string) {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';

    if (password === adminPassword) {
        (await cookies()).set(SESSION_COOKIE_NAME, 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });
        return true;
    }

    return false;
}

export async function logout() {
    (await cookies()).delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated() {
    const session = (await cookies()).get(SESSION_COOKIE_NAME);
    return session?.value === 'authenticated';
}
