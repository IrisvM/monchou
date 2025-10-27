import { getRecipeByTypeAndSlug, listRecipes } from '@/api/recipes';
import Header from '@/components/Header';
import RecipeDetailPage from '@/components/RecipeDetailPage';
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

export async function generateStaticParams(): Promise<
  { type: string; slug: string }[]
> {
  const recipes = await listRecipes();

  return recipes.map((recipe) => ({
    type: recipe.type,
    slug: recipe.slug,
  }));
}
