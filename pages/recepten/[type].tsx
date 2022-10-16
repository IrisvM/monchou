import RecipeList from '../../components/RecipeList';
import TagList from '../../components/TagList';
import uppercaseFirst from '../../helpers/uppercaseFirst';
import useSearch from '../../hooks/useSearch';
import {
  listRecipesByType,
  listRecipeTypes,
  listTagsByType,
  Recipe,
} from '../api/recipes';

type Props = {
  title: string;
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

type Params = {
  params: {
    type: string;
  };
};

export async function getStaticProps({ params: { type } }: Params): Promise<{
  props: Props;
}> {
  return {
    props: {
      title: uppercaseFirst(type) + ' overzicht',
      recipes: await listRecipesByType(type),
      tags: await listTagsByType(type),
    },
  };
}

export async function getStaticPaths() {
  const types = await listRecipeTypes();

  return {
    paths: types.map((type) => {
      return {
        params: {
          type,
        },
      };
    }),
    fallback: false,
  };
}
