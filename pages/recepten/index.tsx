import RecipeList from '../../components/RecipeList';
import TagList from '../../components/TagList';
import useSearch from '../../hooks/useSearch';
import { listRecipes, listTags, Recipe } from '../api/recipes';

type Props = {
  recipes: Recipe[];
  tags: string[];
};
export default function Recipes({ recipes, tags }: Props) {
  const filteredRecipes = useSearch(recipes);

  return (
    <>
      <div className="mb-4">
        <TagList tags={tags} />
      </div>
      <RecipeList recipes={filteredRecipes} />
    </>
  );
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
