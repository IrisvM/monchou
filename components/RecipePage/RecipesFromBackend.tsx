'use client';

import { Recipe } from '../../api/recipes';
import { ReactNode, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import RecipeList from '../RecipeList';
import RecipeListLoading from '../RecipeList/RecipeList.loading';

export function RecipesFromBackend({
  tag,
  type,
}: {
  tag?: string;
  type?: string;
}): ReactNode {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? '';

  const recipes = getRecipesFromBackend(query, tag, type);

  return (
    <Suspense fallback={<RecipeListLoading />}>
      <RecipeList recipes={recipes} />
    </Suspense>
  );
}

async function getRecipesFromBackend(
  query: string,
  tag?: string,
  type?: string
): Promise<Recipe[]> {
  const searchParams = new URLSearchParams();
  if (tag) {
    searchParams.append('tag', tag);
  }
  if (type) {
    searchParams.append('type', type);
  }
  if (query) {
    searchParams.append('query', query);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recepten?${searchParams.toString()}`,
    {
      cache: 'force-cache',
      method: 'GET',
    }
  );
  const data = await response.json();

  return data.recipes;
}
