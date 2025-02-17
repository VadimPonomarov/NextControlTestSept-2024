import {NextRequest, NextResponse} from 'next/server';
import {baseUrl, getAuthorizationHeaders} from "@/common/constants/constants";

export async function GET(req: NextRequest, {params}: { params: { id: string } }) {
    try {
        const {id} = params;
        const headers = await getAuthorizationHeaders();

        const response = await fetch(`${baseUrl}/auth/recipes/${id}`, {
            headers,
        });

        const recipe = await response.json();
        console.log(recipe)
        return NextResponse.json(recipe, {status: 200});
    } catch (error) {
        return NextResponse.json({message: (error as Error).message}, {status: 500});
    }
}

