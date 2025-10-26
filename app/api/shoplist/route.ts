import { getShopListUrls } from '@/api/shoplist';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<Response> {
  const shop = req.nextUrl.searchParams.get('shop') || 'ah';
  let recipes = req.nextUrl.searchParams.getAll('recipe[]');

  const { urls, ingredients } = await getShopListUrls(shop, recipes);

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
