import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';
import withAuth, { NextRequestWithAuth } from 'next-auth/middleware';

async function setHeaders(res: NextResponse) {
    res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    return res;
}

export async function middleware(req: NextRequestWithAuth) {
    console.log('Middleware start for URL:', req.url);

    // Блокируем прямой доступ к /api из адресной строки браузера
    if (req.url.includes('/api/') && (!req.headers.get('referer') || req.headers.get('referer') === req.url)) {
        console.log('Direct access to API from the address bar is blocked. Redirecting to /error.');
        return NextResponse.redirect(new URL('/error', req.url));
    }

    const response = await withAuth(req, {});
    if (response) {
        return response;
    }

    try {
        const accessToken = await getCookie('accessToken', { req });

        if (!accessToken && !req.url.includes('/api/auth')) {
            console.log('Redirecting to /api/auth due to missing access token.');
            return NextResponse.redirect(new URL('/api/auth', req.url));
        }

        const res = NextResponse.next();
        return await setHeaders(res);
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.redirect(new URL('/api/auth', req.url));
    }
}

export { middleware as default };

export const config = {
    matcher: [
        '/api/recipes/:path*',
        '/recipes/:path*',
        '/profile/:path*',
        '/users/:path*'
    ],
};

