import { readRecipeListByIndex } from './cache';
import { readRecipe } from './fs';

export type Recipe = RecipeListItem & {
  ingredients: { quantity: number; unit: string; title: string; to?: string }[];
  serving: string;
  content: string;
};
export type RecipeListItem = {
  title: string;
  tags: string[];
  type: string;
  slug: string;
  image: null | string;
  filename: string;
  key: string;
};

export async function getRecipe(path: string): Promise<Recipe> {
  return await readRecipe(path);
}

export async function getRecipeByTypeAndSlug(
  type: string,
  slug: string
): Promise<Recipe> {
  const recipes = await listRecipesByType(type);

  const recipe = recipes.find((recipe) => recipe.slug === slug)!;

  return getRecipe(recipe.filename);
}

export async function listRecipes(): Promise<RecipeListItem[]> {
  return await readRecipeListByIndex();
}

export async function listRecipesByType(
  type: string
): Promise<RecipeListItem[]> {
  const recipes = await listRecipes();

  const matcher = new RegExp(`^${type}$`, 'i');
  return recipes.filter((recipe) => matcher.test(recipe.type));
}

export async function listRecipesByTag(tag: string): Promise<RecipeListItem[]> {
  return (await listRecipes()).filter((recipe) => recipe.tags.includes(tag));
}

export async function listTags(): Promise<string[]> {
  const set = new Set<string>();
  const recipes = await listRecipes();

  for (const recipe of recipes) {
    for (const tag of recipe.tags) {
      set.add(tag.toLocaleLowerCase());
    }
  }

  return [...set];
}

export async function listTagsByType(type: string): Promise<string[]> {
  const set = new Set<string>();
  const recipes = await listRecipesByType(type);

  for (const recipe of recipes) {
    for (const tag of recipe.tags) {
      set.add(tag);
    }
  }

  return [...set];
}

export async function listRecipeTypes(): Promise<string[]> {
  return [...new Set((await listRecipes()).map((recipe) => recipe.type))];
}

export async function* listRecipeTypeTags(): AsyncGenerator<{
  type: string;
  tag: string;
}> {
  const types = await listRecipeTypes();

  for (const type of types) {
    const tags = await listTagsByType(type);
    for (const tag of tags) {
      yield { type, tag };
    }
  }
}
