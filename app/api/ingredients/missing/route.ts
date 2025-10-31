import { readAllRecipes } from '@/api/fs';
import { hasIngredient } from '@/api/shoplist';

export async function GET(): Promise<Response> {
  const recipes = await readAllRecipes();

  const missing = recipes
    .flatMap((recipe) => recipe.ingredients)
    .filter(
      (ingredient) => ingredient.title && !hasIngredient('ah', ingredient.title)
    );

  return Response.json({
    count: missing.length,
    missing: Object.fromEntries(
      missing.map((ing) => [ing.title, { id: '', quantity: 1 }])
    ),
  });
}
