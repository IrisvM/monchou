import RecipeList from '../../../../components/RecipeList';
import TagList from '../../../../components/TagList';
import uppercaseFirst from '../../../../helpers/uppercaseFirst';
import useSearch from '../../../../hooks/useSearch';
import {
  listRecipesByTag,
  listRecipeTypes,
  listTags,
  listTagsByType,
  Recipe,
} from '../../../api/recipes';

type Props = {
  recipes: Recipe[];
  tags: string[];
  tag: string;
  type: string;
};
export default function RecipesByTag({ recipes, tags, type }: Props) {
  const filteredRecipes = useSearch(recipes);

  return (
    <>
      <div className="mb-4">
        <TagList type={type} tags={tags} />
      </div>
      <RecipeList recipes={filteredRecipes} />
    </>
  );
}
RecipesByTag.displayName = 'Recepten overzicht';

type Params = {
  params: {
    tag: string;
    type: string;
  };
};
export async function getStaticProps({
  params: { tag, type },
}: Params): Promise<{
  props: Props & { title: string };
}> {
  return {
    props: {
      title: `${uppercaseFirst(tag)} Recepten`,
      recipes: await listRecipesByTag(tag),
      tags: await listTagsByType(type),
      tag,
      type,
    },
  };
}

export async function getStaticPaths(): Promise<{
  paths: Params[];
  fallback: boolean;
}> {
  const types = await listRecipeTypes();
  const typeWithTags: { type: string; tag: string }[] = [];

  for (const type of types) {
    const tags = await listTagsByType(type);
    for (const tag of tags) {
      typeWithTags.push({ type, tag });
    }
  }

  return {
    paths: typeWithTags.map(({ tag, type }) => {
      return {
        params: {
          type,
          tag,
        },
      };
    }),
    fallback: false,
  };
}
