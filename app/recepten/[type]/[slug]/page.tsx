import { getRecipeByTypeAndSlug, listRecipes } from '@/api/recipes';
import Header from '@/components/Header';
import RecipeDetailPage from '@/components/RecipeDetailPage';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export default async function Recipe(props: {
  params: Promise<{ type: string; slug: string }>;
}): Promise<ReactNode> {
  const { type, slug } = await props.params;

  const recipe = await getRecipeByTypeAndSlug(type, slug);
  return (
    <>
      <Header>{recipe.title}</Header>
      <RecipeDetailPage recipe={recipe} />
    </>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ type: string; slug: string }>;
}): Promise<Metadata> {
  const { type, slug } = await props.params;

  const { title } = await getRecipeByTypeAndSlug(type, slug);

  return {
    title: title,
    description: `Het recept voor ${title}`,
  };
}

export async function generateStaticParams(): Promise<
  { type: string; slug: string }[]
> {
  const recipes = await listRecipes();

  return recipes.map((recipe) => ({
    type: recipe.type,
    slug: recipe.slug,
  }));
}
