import RecipeListPage from '@/components/RecipeListPage';
import { listRecipeTypes, listTagsByType } from '@/api/recipes';
import Header from '@/components/Header';
import uppercaseFirst from '@/helpers/uppercaseFirst';
import { ReactNode } from 'react';
import { Metadata } from 'next';

const plural: { [word: string]: string | undefined } = {
  hoofdgerecht: 'hoofdgerechten',
  baksel: 'baksels',
  bijgerecht: 'bijgerechten',
};

export default async function RecipesByTag(props: {
  params: Promise<{ type: string }>;
}): Promise<ReactNode> {
  const { type } = await props.params;

  const tags = await listTagsByType(type);

  return (
    <>
      <Header>{uppercaseFirst(plural[type] ?? type)}</Header>
      <RecipeListPage tags={tags} type={type} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;

  return {
    title: `${uppercaseFirst(plural[type] ?? type)}`,
    description: `Overzicht van alle ${type} recepten`,
  };
}

export async function generateStaticParams(): Promise<{ type: string }[]> {
  const types = await listRecipeTypes();
  return types.map((type) => ({
    type,
  }));
}
