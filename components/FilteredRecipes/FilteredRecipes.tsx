'use client';

import useSearch from '@/hooks/useSearch';
import RecipeList from '../RecipeList';
import { Recipe } from '@/api/recipes';

export default function FilteredRecipes({ recipes }: { recipes: Recipe[] }) {
  const filteredRecipes = useSearch(recipes);

  return <RecipeList recipes={filteredRecipes} />;
}
