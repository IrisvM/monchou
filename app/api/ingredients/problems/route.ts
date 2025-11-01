import { readAllRecipes } from '@/api/fs';
import { getIngredient } from '@/api/shoplist';

export async function GET(): Promise<Response> {
  const recipes = await readAllRecipes();

  const problems = recipes
    .flatMap((recipe) =>
      recipe.ingredients.map((ingredient) => ({
        recipe: recipe.slug,
        ingredient,
      }))
    )
    .filter((ing) => ing.ingredient.title)
    .flatMap((ing) => ({
      ...ing,
      shopIngredient: getIngredient('ah', ing.ingredient.title),
    }))
    .filter(
      (
        ing
      ): ing is {
        recipe: string;
        ingredient: { title: string; unit: string; quantity: number };
        shopIngredient: {
          name: string;
          id: string;
          quantity: number;
        };
      } => ing.shopIngredient !== undefined
    )
    .map((ing) => ({
      ...ing,
      amountNeeded: ing.ingredient.quantity / ing.shopIngredient.quantity,
    }))
    .map((ing) => ({
      recipe: ing.recipe,
      ingredient: ing.ingredient.title,
      amountNeeded: ing.amountNeeded,
      problems: [
        ing.amountNeeded > 2 ? 'quantity mismatch, amount to big' : undefined,
        isNaN(ing.amountNeeded)
          ? 'quantity invalid, amount is not a number'
          : undefined,
      ].filter((p): p is string => !!p),
    }))
    .filter((ing) => ing.problems.length > 0);

  return Response.json({
    count: problems.length,
    problems,
  });
}
