import { useEffect, useState } from 'react';
import { Recipe } from '../api/recipes';
import { useSearchParams } from 'next/navigation';

export default function useSearch(recipes: Recipe[]): Recipe[] {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const queryParams = useSearchParams();
  const query = queryParams?.get('query') ?? '';

  useEffect(() => {
    const queryString = Array.isArray(query) ? query.join(' ') : (query ?? '');
    const safeRegexp = new RegExp(
      queryString.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      'gi'
    );

    setFilteredRecipes(recipes.filter((r) => safeRegexp.test(r.title)));
  }, [setFilteredRecipes, recipes, query]);

  return filteredRecipes;
}
