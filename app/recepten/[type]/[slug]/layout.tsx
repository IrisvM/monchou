import { getRecipeByTypeAndSlug } from '@/api/recipes';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ type: string; slug: string }>;
}): Promise<Metadata> {
  const { type, slug } = await props.params;

  const { title } = await getRecipeByTypeAndSlug(type, slug);

  return {
    title: title,
  };
}

type Props = {
  children: ReactNode;
};
export default function RecipeLayout({ children }: Props): ReactNode {
  return children;
}
