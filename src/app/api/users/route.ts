import { NextRequest, NextResponse } from 'next/server';
import { fetchUsers } from '@/app/api/users/helpers.ts';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const params = Object.fromEntries(searchParams.entries());
        const users = await fetchUsers(params);

        if (users.status === 'unauthorized') {
            console.log('Redirecting to /api/auth due to unauthorized access.');
            return NextResponse.redirect('/api/auth');
        }

        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}


