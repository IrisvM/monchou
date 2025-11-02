import { recipeListIndex } from '../data/recipes/.cache/list';
import { RecipeListItem } from './recipes';

export async function readRecipeListByIndex(): Promise<RecipeListItem[]> {
  return recipeListIndex;
}
