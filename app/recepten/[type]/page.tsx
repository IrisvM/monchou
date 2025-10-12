import RecipeListPage from '@/components/RecipePage';
import { listRecipeTypes, listTagsByType } from '@/api/recipes';
import Header from '@/components/Header';
import uppercaseFirst from '@/helpers/uppercaseFirst';
import { ReactNode } from 'react';

export default async function RecipesByTag(props: {
  params: Promise<{ type: string }>;
}): Promise<ReactNode> {
  const { type } = await props.params;

  const tags = await listTagsByType(type);
  const plural: { [word: string]: string | undefined } = {
    hoofdgerecht: 'hoofdgerechten',
    baksel: 'baksels',
    bijgerecht: 'bijgerechten',
  };

  return (
    <>
      <Header>{uppercaseFirst(plural[type] ?? type)}</Header>
      <RecipeListPage tags={tags} type={type} />
    </>
  );
}

export async function generateStaticParams(): Promise<{ type: string }[]> {
  const types = await listRecipeTypes();
  return types.map((type) => ({
    type,
  }));
}
