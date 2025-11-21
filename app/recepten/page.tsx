import RecipeListPage from '@/components/RecipeListPage';
import { listTags } from '@/api/recipes';
import Header from '@/components/Header';
import { ReactNode } from 'react';
import { Metadata } from 'next';

export default async function RecipesByTag(props: {
  params: Promise<{ type: string }>;
}): Promise<ReactNode> {
  const { type } = await props.params;

  const tags = await listTags();

  return (
    <>
      <Header>Recepten</Header>
      <RecipeListPage tags={tags} type={type} />
    </>
  );
}

export const metadata: Metadata = {
  title: 'Recepten',
  description: 'Overzicht van alle recepten',
};
