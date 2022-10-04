import { useRouter } from 'next/router';
import { useMemo } from 'react';
import RecipeList from '../components/RecipeList';
import { listRecipes, Recipe } from './api/recipes';

type Props = {
  recipes: Recipe[];
};
export default function Home({ recipes }: Props) {
  const router = useRouter();
  const { query } = router.query;

  const filteredRecipes = useMemo<Recipe[]>(() => {
    const queryString = Array.isArray(query) ? query.join(' ') : query ?? '';
    const safeRegexp = new RegExp(
      queryString.replaceAll(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      'gi'
    );

    return recipes.filter((r) => safeRegexp.test(r.title));
  }, [query, recipes]);

  return <RecipeList recipes={filteredRecipes} />;
}
Home.displayName = 'Zoeken...';

export async function getStaticProps(): Promise<{
  props: Props;
}> {
  return {
    props: {
      recipes: await listRecipes(),
    },
  };
}
