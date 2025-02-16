// src/app/api/recipes/route.ts
import { fetchRecipes } from '@/app/recipes/helpers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const params = Object.fromEntries(searchParams.entries());
        const recipes = await fetchRecipes(params);
        return NextResponse.json(recipes, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}

