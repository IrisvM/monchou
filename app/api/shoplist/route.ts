import { getShopListUrls } from '@/api/shoplist';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  let recipes = req.nextUrl.searchParams.getAll('recipe[]');

  const { urls, ingredients } = await getShopListUrls(recipes);

  return Response.json(
    { urls, ingredients },
    {
      headers: {
        'Netlify-CDN-Cache-Control':
          'public, durable, s-maxage=60, stale-while-revalidate=300',
        'Netlify-Vary': 'query=recipe|shop',
      },
    }
  );
}
