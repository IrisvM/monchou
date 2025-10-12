import { useEffect, useState } from 'react';
import { Recipe } from '../api/recipes';
import { useSearchParams } from 'next/navigation';
import Fuse from 'fuse.js';

export default function useSearch(recipes: Recipe[]): Recipe[] {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const queryParams = useSearchParams();
  const query = queryParams?.get('query') ?? '';

  const fuse = new Fuse(recipes, {
    keys: ['title', 'tags'],
    threshold: 0.3,
  });

  useEffect(() => {
    if (!query) {
      setFilteredRecipes(recipes);
      return;
    }

    const results = fuse.search(query);
    setFilteredRecipes(results.map((result) => result.item));
  }, [setFilteredRecipes, recipes, query]);

  return filteredRecipes;
}
