'use client';

import { Recipe } from '../../api/recipes';
import { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import RecipeList from '../RecipeList';
import useSWR from 'swr';

export function RecipesFromBackend({
  tag,
  type,
}: {
  tag?: string;
  type?: string;
}): ReactNode {
  const searchParams = useSearchParams();
  const query = searchParams?.get('query') ?? '';

  const { recipes, isLoading } = useRecipesFromBackend(query, tag, type);

  return <RecipeList recipes={recipes} isLoading={isLoading} />;
}

function useRecipesFromBackend(
  query: string,
  tag?: string,
  type?: string
): { recipes: Recipe[]; isLoading: boolean } {
  const { data } = useSWR(['recipes', type, tag, query], () =>
    getRecipesFromBackend(query, tag, type)
  );

  return { recipes: data ?? [], isLoading: !data };
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
    window.location.origin + '/api/recepten?' + searchParams.toString(),
    {
      method: 'GET',
    }
  );
  const data = await response.json();

  return data.recipes;
}
