import RecipeListPage from '@/components/RecipePage';
import uppercaseFirst from '@/helpers/uppercaseFirst';
import { listRecipesByTag, listTags, Recipe } from '@/api/recipes';

export default async function RecipesByTag({
  params: { tag },
}: {
  params: { tag: string };
}) {
  const recipes = await listRecipesByTag(tag);
  const tags = await listTags();

  return <RecipeListPage recipes={recipes} tags={tags} />;
}

export async function generateStaticParams() {
  const tags = await listTags();

  return tags.map((tag) => ({ tag }));
}
