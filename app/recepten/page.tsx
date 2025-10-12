import RecipeListPage from '@/components/RecipePage';
import { listTags } from '@/api/recipes';
import Header from '@/components/Header';
import { ReactNode } from 'react';

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
