import { searchRecipes } from '@/api/search';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const query = req.nextUrl.searchParams.get('query') || undefined;
  const tag = req.nextUrl.searchParams.get('tag') || undefined;
  const type = req.nextUrl.searchParams.get('type') || undefined;

  let recipes = await searchRecipes({ query, tag, type });

  const response = Response.json(
    { recipes },
    {
      headers: {
        'Cache-Control':
          'public, durable, s-maxage=60, stale-while-revalidate=300',
        'Netlify-Vary': 'query=query|tag|type',
      },
    }
  );

  return response;
}
