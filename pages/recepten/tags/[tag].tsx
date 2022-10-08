import RecipeList from '../../../components/RecipeList';
import TagList from '../../../components/TagList';
import uppercaseFirst from '../../../helpers/uppercaseFirst';
import useSearch from '../../../hooks/useSearch';
import { listRecipesByTag, listTags, Recipe } from '../../api/recipes';

type Props = {
  recipes: Recipe[];
  tags: string[];
  tag: string;
};
export default function RecipesByTag({ recipes, tags }: Props) {
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
RecipesByTag.displayName = 'Recepten overzicht';

type Params = {
  params: {
    tag: string;
  };
};
export async function getStaticProps({ params: { tag } }: Params): Promise<{
  props: Props & { title: string };
}> {
  return {
    props: {
      title: `${uppercaseFirst(tag)} Recepten`,
      recipes: await listRecipesByTag(tag),
      tags: await listTags(),
      tag,
    },
  };
}

export async function getStaticPaths() {
  const tags = await listTags();

  return {
    paths: tags.map((tag) => {
      return {
        params: {
          tag: tag,
        },
      };
    }),
    fallback: false,
  };
}
