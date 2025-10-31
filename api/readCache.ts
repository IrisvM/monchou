import { recipeListIndex } from '../recipes/.cache/list.js';

export async function readRecipeListByIndex(): Promise<RecipeListItem[]> {
  return recipeListIndex;
}
