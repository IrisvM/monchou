import RecipeListPage from '@/components/RecipePage';
import { listRecipesByTag, listTags } from '@/api/recipes';
import { ReactNode } from 'react';

export default async function RecipesByTag(props: {
  params: Promise<{ tag: string }>;
}): Promise<ReactNode> {
  const { tag } = await props.params;

  const recipes = await listRecipesByTag(tag);
  const tags = await listTags();

  return <RecipeListPage recipes={recipes} tags={tags} />;
}

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  const tags = await listTags();

  return tags.map((tag) => ({ tag }));
}
