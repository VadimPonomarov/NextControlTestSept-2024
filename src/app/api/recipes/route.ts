import { NextRequest, NextResponse } from 'next/server';
import { fetchRecipes } from '@/app/api/recipes/helpers.ts';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const params = Object.fromEntries(searchParams.entries());
        const recipes = await fetchRecipes(params);
        return NextResponse.json(recipes, { status: 200 });
    } catch (error) {
        if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
            console.error('Received HTML response instead of JSON:', error.message);
            return NextResponse.json({ message: 'Received HTML response instead of JSON' }, { status: 500 });
        }
        console.error('Failed to fetch recipes:', error);
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}


