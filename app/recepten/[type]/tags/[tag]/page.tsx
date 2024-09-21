import RecipeListPage from '@/components/RecipePage';
import {
  listRecipesByTag,
  listRecipeTypeTags,
  listTagsByType,
} from '@/api/recipes';
import asyncGeneratorToArray from '@/helpers/asyncGenetorToArray';
import Header from '@/components/Header';
import uppercaseFirst from '@/helpers/uppercaseFirst';

export default async function RecipesByTag({
  params: { tag, type },
}: {
  params: { tag: string; type: string };
}) {
  const recipes = await listRecipesByTag(tag);
  const tags = await listTagsByType(type);

  return (
    <>
      <Header>{uppercaseFirst(tag)} recepten</Header>
      <RecipeListPage recipes={recipes} tags={tags} type={type} />
    </>
  );
}

export async function generateStaticParams() {
  const tags = await asyncGeneratorToArray(listRecipeTypeTags());

  return tags.map(({ tag, type }) => ({
    tag,
    type,
  }));
}
