import RecipeListPage from '../../components/RecipePage';
import { listRecipes, listTags, Recipe } from '../api/recipes';

type Props = {
  recipes: Recipe[];
  tags: string[];
};
export default function Recipes({ recipes, tags }: Props) {
  return <RecipeListPage recipes={recipes} tags={tags} />;
}
Recipes.displayName = 'Recepten overzicht';

export async function getStaticProps(): Promise<{
  props: Props;
}> {
  return {
    props: {
      recipes: await listRecipes(),
      tags: await listTags(),
    },
  };
}
