import RecipeListPage from '@/components/RecipePage';
import {
  listRecipesByTag,
  listRecipeTypeTags,
  listTagsByType,
} from '@/api/recipes';
import asyncGeneratorToArray from '@/helpers/asyncGenetorToArray';
import Header from '@/components/Header';
import uppercaseFirst from '@/helpers/uppercaseFirst';
import { ReactNode } from 'react';

export default async function RecipesByTag(props: {
  params: Promise<{ tag: string; type: string }>;
}): Promise<ReactNode> {
  const { tag, type } = await props.params;

  const recipes = await listRecipesByTag(tag);
  const tags = await listTagsByType(type);

  return (
    <>
      <Header>{uppercaseFirst(tag)} recepten</Header>
      <RecipeListPage recipes={recipes} tags={tags} type={type} />
    </>
  );
}

export async function generateStaticParams(): Promise<
  { tag: string; type: string }[]
> {
  const tags = await asyncGeneratorToArray(listRecipeTypeTags());

  return tags.map(({ tag, type }) => ({
    tag,
    type,
  }));
}
