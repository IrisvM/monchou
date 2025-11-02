import RecipeListPage from '@/components/RecipeListPage';
import { listTags } from '@/api/recipes';
import { ReactNode } from 'react';

export default async function RecipesByTag(props: {
  params: Promise<{ tag: string }>;
}): Promise<ReactNode> {
  const { tag } = await props.params;

  const tags = await listTags();

  return <RecipeListPage tag={tag} tags={tags} />;
}

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  const tags = await listTags();

  return tags.map((tag) => ({ tag }));
}
