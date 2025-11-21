import RecipeListPage from '@/components/RecipeListPage';
import { listRecipeTypeTags, listTagsByType } from '@/api/recipes';
import asyncGeneratorToArray from '@/helpers/asyncGenetorToArray';
import Header from '@/components/Header';
import uppercaseFirst from '@/helpers/uppercaseFirst';
import { ReactNode } from 'react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string; type: string }>;
}): Promise<Metadata> {
  const { tag } = await params;

  return {
    title: `${uppercaseFirst(tag)} recepten`,
    description: `Overzicht van alle ${tag} recepten`,
  };
}

export default async function RecipesByTag(props: {
  params: Promise<{ tag: string; type: string }>;
}): Promise<ReactNode> {
  const { tag, type } = await props.params;

  const tags = await listTagsByType(type);

  return (
    <>
      <Header>{uppercaseFirst(tag)} recepten</Header>
      <RecipeListPage tags={tags} type={type} tag={tag} />
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
