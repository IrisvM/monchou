'use client';

import useSearch from '@/hooks/useSearch';
import RecipeList from '../RecipeList';
import { Recipe } from '@/api/recipes';
import { Suspense } from 'react';

function FilteredRecipesUsingSearch({ recipes }: { recipes: Recipe[] }) {
  const filteredRecipes = useSearch(recipes);

  return <RecipeList recipes={filteredRecipes} />;
}

export default function FilteredRecipes({ recipes }: { recipes: Recipe[] }) {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <FilteredRecipesUsingSearch recipes={recipes} />
    </Suspense>
  );
}
