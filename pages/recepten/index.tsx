import RecipeList from '../../components/RecipeList';
import { listRecipes, Recipe } from '../api/recipes';

type Props = {
  recipes: Recipe[];
};
export default function Recipes({ recipes }: Props) {
  return <RecipeList recipes={recipes} />;
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
