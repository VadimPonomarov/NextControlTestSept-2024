import {NextRequest, NextResponse} from 'next/server';
import {baseUrl, getAuthorizationHeaders} from "@/common/constants/constants";

export async function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const params = Object.fromEntries(searchParams.entries());
        const urlSearchParams = new URLSearchParams(params).toString();
        const response = await fetch(`${baseUrl}/auth/recipes?${urlSearchParams}`, {
            headers: await getAuthorizationHeaders(),
        });
        const recipes = await response.json();
        return NextResponse.json(recipes, {status: 200});
    } catch (error) {
        return NextResponse.json({message: (error as Error).message}, {status: 500});
    }
}

