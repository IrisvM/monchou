import { getRecipeByTypeAndSlug } from '@/api/recipes';
import Header from '@/components/Header';
import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({
  params: { type, slug },
}: {
  params: { type: string; slug: string };
}): Promise<Metadata> {
  const { title } = await getRecipeByTypeAndSlug(type, slug);

  return {
    title: title,
  };
}

export default async function RecipeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
