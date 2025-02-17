import {NextResponse} from 'next/server';
import {getCookie} from 'cookies-next';
import withAuth, {NextRequestWithAuth} from 'next-auth/middleware';

async function setHeaders(res: NextResponse) {
    res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    return res;
}

export async function middleware(req: NextRequestWithAuth) {

    // const referrer = req.headers.get('referer');
    // if (!referrer || referrer === req.url) {
    //     return NextResponse.redirect(new URL('/error', req.url));
    // }

    const response = await withAuth(req, {});
    if (response) {
        return response;
    }

    try {
        const accessToken = await getCookie('accessToken', {req});

        if (!accessToken && !req.url.includes('/api/auth')) {
            return NextResponse.redirect(new URL('/api/auth', req.url));
        }

        if (req.url.startsWith('/api/') && !req.url.includes('/api/auth')) {
            const url =
                new URL(
                    req.url, req.url.startsWith('https') ?
                        'https://' :
                        'http://localhost:3000'
                );
            url.pathname = url.pathname.replace(/^\/api/, '');

            const res = NextResponse.rewrite(url.toString());
            return await setHeaders(res);
        }

        const res = NextResponse.next();
        return await setHeaders(res);
    } catch {
        return NextResponse.redirect(new URL('/api/auth', req.url));
    }
}

export {middleware as default};

export const config = {
    matcher: [
        '/api/recipes/:path*',
        '/recipes/:path*',
        '/profile/:path*',
        '/users/:path*'
    ],
};
