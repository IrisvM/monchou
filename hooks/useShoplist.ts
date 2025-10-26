import { Ingredient, ShoplistOutput } from '@/api/shoplist';
import { RecipeSelection } from '../context/selectionContext';
import useSWR from 'swr';

export function useShoplist(recipes: RecipeSelection[]): {
  isLoading: boolean;
  error?: Error;
  ingredients: Ingredient[];
  urls: { [shop: string]: string };
} {
  const key =
    '/shoplist/' +
    recipes.map((recipe) => `${recipe.type}/${recipe.slug}`).join(',');

  const swr = useSWR(key, () => getIngredientsFromRecipes(recipes), {
    keepPreviousData: true,
  });

  return {
    isLoading: swr.isLoading,
    error: swr.error,
    ingredients: swr.data?.ingredients ?? [],
    urls: swr.data?.urls ?? {},
  };
}

async function getIngredientsFromRecipes(
  recipes: RecipeSelection[]
): Promise<ShoplistOutput> {
  if (recipes.length === 0) {
    return {
      urls: {},
      ingredients: [],
    };
  }

  const url =
    '/api/shoplist?recipe[]=' +
    recipes.map((recipe) => `${recipe.type}/${recipe.slug}`).join('&recipe[]=');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch ingredients');
  }

  return response.json();
}
