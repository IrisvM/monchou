import RecipeListPage from '@/components/RecipePage';
import { listRecipes, listTags } from '@/api/recipes';
import Header from '@/components/Header';

export default async function RecipesByTag({
  params: { type },
}: {
  params: { type: string };
}) {
  const recipes = await listRecipes();
  const tags = await listTags();

  return (
    <>
      <Header>Recepten</Header>
      <RecipeListPage recipes={recipes} tags={tags} type={type} />
    </>
  );
}
