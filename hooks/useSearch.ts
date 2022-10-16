import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Recipe } from '../pages/api/recipes';

export default function useSearch(recipes: Recipe[]): Recipe[] {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const router = useRouter();
  const { query } = router.query;

  useEffect(() => {
    const queryString = Array.isArray(query) ? query.join(' ') : query ?? '';
    const safeRegexp = new RegExp(
      queryString.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      'gi'
    );

    setFilteredRecipes(recipes.filter((r) => safeRegexp.test(r.title)));
  }, [setFilteredRecipes, recipes, query]);

  return filteredRecipes;
}
