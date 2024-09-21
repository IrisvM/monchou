import RecipeListPage from '@/components/RecipePage';
import {
  listRecipesByType,
  listRecipeTypes,
  listTagsByType,
} from '@/api/recipes';
import Header from '@/components/Header';
import uppercaseFirst from '@/helpers/uppercaseFirst';

export default async function RecipesByTag({
  params: { type },
}: {
  params: { type: string };
}) {
  const recipes = await listRecipesByType(type);
  const tags = await listTagsByType(type);
  const plural: { [word: string]: string | undefined } = {
    hoofdgerecht: 'hoofdgerechten',
    baksel: 'baksels',
    bijgerecht: 'bijgerechten',
  };

  return (
    <>
      <Header>{uppercaseFirst(plural[type] ?? type)}</Header>
      <RecipeListPage recipes={recipes} tags={tags} type={type} />
    </>
  );
}

export async function generateStaticParams() {
  const types = await listRecipeTypes();
  return types.map((type) => ({
    type,
  }));
}
