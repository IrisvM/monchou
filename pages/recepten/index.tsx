import RecipeList from '../../components/RecipeList';
import useSearch from '../../hooks/useSearch';
import { listRecipes, Recipe } from '../api/recipes';

type Props = {
  recipes: Recipe[];
};
export default function Recipes({ recipes }: Props) {
  const filteredRecipes = useSearch(recipes);

  return <RecipeList recipes={filteredRecipes} />;
}
Recipes.displayName = 'Recepten overzicht';

export async function getStaticProps(): Promise<{
  props: Props;
}> {
  return {
    props: {
      recipes: await listRecipes(),
    },
  };
}
