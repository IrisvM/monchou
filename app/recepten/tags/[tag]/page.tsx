import RecipeListPage from '@/components/RecipeListPage';
import { listTags } from '@/api/recipes';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import uppercaseFirst from '@/helpers/uppercaseFirst';

export default async function RecipesByTag(props: {
  params: Promise<{ tag: string }>;
}): Promise<ReactNode> {
  const { tag } = await props.params;

  const tags = await listTags();

  return <RecipeListPage tag={tag} tags={tags} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string; type: string }>;
}): Promise<Metadata> {
  const { tag } = await params;

  return {
    title: `${uppercaseFirst(tag)} recepten`,
  };
}

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  const tags = await listTags();

  return tags.map((tag) => ({ tag }));
}
