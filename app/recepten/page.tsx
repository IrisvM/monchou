import RecipeListPage from '@/components/RecipePage';
import { listRecipes, listTags } from '@/api/recipes';
import Header from '@/components/Header';
import { ReactNode } from 'react';

export default async function RecipesByTag(props: {
  params: Promise<{ type: string }>;
}): Promise<ReactNode> {
  const { type } = await props.params;

  const recipes = await listRecipes();
  const tags = await listTags();

  return (
    <>
      <Header>Recepten</Header>
      <RecipeListPage recipes={recipes} tags={tags} type={type} />
    </>
  );
}
