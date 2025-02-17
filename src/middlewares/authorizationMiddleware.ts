import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

export async function middleware(req: NextRequest) {
    try {
        const accessTokenPromise = await getCookie('accessToken', { req });

        const accessToken = await accessTokenPromise;
        console.log(accessToken)

        if (!accessToken) {
            return NextResponse.redirect(new URL('/api/auth', req.url));
        }

        const res = NextResponse.next();

        res.headers.set('Content-Type', 'application/json');
        res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        return res;
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.redirect(new URL('/api/auth', req.url));
    }
}

export const config = {
    matcher: ['/api/recipes/:path*', '/recipes/:path*', '/profile/:path*'],
};
