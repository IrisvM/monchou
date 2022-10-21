import RecipeListPage from '../../../../components/RecipePage';
import asyncGeneratorToArray from '../../../../helpers/asyncGenetorToArray';
import uppercaseFirst from '../../../../helpers/uppercaseFirst';
import {
  listRecipesByTag,
  listRecipeTypeTags,
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
  return <RecipeListPage recipes={recipes} tags={tags} type={type} />;
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
  const types = listRecipeTypeTags();

  return {
    paths: (await asyncGeneratorToArray(types)).map(({ type, tag }) => {
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
