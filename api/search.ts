import Fuse from 'fuse.js';
import { RecipeListItem } from './recipes';
import { readRecipeListByIndex } from './readCache';

type Props = {
  query?: string;
  tag?: string;
  type?: string;
};
export async function searchRecipes({
  query,
  tag,
  type,
}: Props): Promise<RecipeListItem[]> {
  let recipes = await readRecipeListByIndex();
  const fuse = new Fuse(recipes, { threshold: 0.3, keys: ['title', 'tags'] });

  if (query) {
    recipes = fuse.search(query).map((result) => result.item);
  }

  if (type) {
    const t = type.toLowerCase();
    recipes = recipes.filter((recipe) => recipe.type.toLowerCase() === t);
  }

  if (tag) {
    const t = tag.toLowerCase();
    recipes = recipes.filter((recipe) =>
      recipe.tags.some((tag) => tag.toLowerCase() === t)
    );
  }

  return recipes;
}
