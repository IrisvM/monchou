import { RecipeListItem } from '@/api/recipes';
import fs from 'node:fs/promises';
import { readAllRecipes } from './fs';
import {} from '../recipes/.cache/index.js';

const CACHE_DIR = `${process.cwd()}/recipes/.cache`;

async function ensureCacheDirExists(): Promise<void> {
  await fs.mkdir(CACHE_DIR, { recursive: true });
}

export async function buildRecipeListIndex(): Promise<void> {
  await ensureCacheDirExists();
  const recipes = await readAllRecipes();

  const index = recipes.map((recipe) => ({
    title: recipe.title,
    tags: recipe.tags,
    type: recipe.type,
    slug: recipe.slug,
    image: recipe.image,
    filename: recipe.filename,
    key: recipe.key,
  })) as RecipeListItem[];

  const stringJson = JSON.stringify(index, null, 2);
  const stringJs = `export const recipeListIndex = ${stringJson};\n`;

  await fs.writeFile(CACHE_DIR + '/list.js', stringJs);
}

export async function readRecipeListByIndex(): Promise<RecipeListItem[]> {
  const contents = await import('../recipes/.cache/list.js');

  return contents.recipeListIndex;
}
