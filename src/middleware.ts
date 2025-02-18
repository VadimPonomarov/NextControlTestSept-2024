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

    if (req.url.includes('/api/')) {
        const referrer = req.headers.get('referer');
        if (!referrer || !referrer.includes('/api/')) {
            console.log('Direct access to API is blocked. Redirecting to /error.');
            return NextResponse.redirect(new URL('/error', req.url));
        }
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

        if (req.url.startsWith('/api/') && !req.url.includes('/api/auth')) {
            const url = new URL(req.url, req.url.startsWith('https') ? 'https://' : 'http://localhost:3000');
            url.pathname = url.pathname.replace(/^\/api/, '');
            console.log('Original URL:', req.url);
            console.log('Rewritten URL:', url.toString());

            const res = NextResponse.rewrite(url.toString());
            return await setHeaders(res);
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