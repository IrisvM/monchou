import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type Recipe = {
  title: string;
  ingredients: { quantity: number; unit: string; title: string; to?: string }[];
  serving: string;
  tags: string[];
  image: null | string;
  slug: string;
  content: string;
  type: string;
  key: string;
  filename: string;
};

const RECIPE_DIR = `${process.cwd()}/recipes`;

export async function getRecipe(path: string): Promise<Recipe> {
  const fileContents = await fs.promises.readFile(
    `${RECIPE_DIR}/${path}`,
    'utf8'
  );

  try {
    const { data, content } = matter(fileContents);

    const result = await remark().use(html).process(content);
    return {
      ...data,
      slug: data.slug.toLocaleLowerCase(),
      type: data.type.toLocaleLowerCase(),
      image: data.image ?? null,
      tags: data.tags ?? [],
      content: result.toString(),
      filename: path,
      key: path,
    } as Recipe;
  } catch (err) {
    throw new Error(`Error during parsing ${path}: ${err}`);
  }
}

export async function getRecipeByTypeAndSlug(
  type: string,
  slug: string
): Promise<Recipe> {
  const recipes = await listRecipesByType(type);

  const recipe = recipes.find((recipe) => recipe.slug === slug)!;

  return recipe;
}

export async function listRecipes(): Promise<Recipe[]> {
  const allRecipes = [];

  for await (const recipe of listRecipesDir('')) {
    allRecipes.push(recipe);
  }

  return allRecipes;
}

async function* listRecipesDir(dir: string): AsyncGenerator<Recipe> {
  const fileNames = await fs.promises.readdir(path.join(RECIPE_DIR, dir));

  for (const fileName of fileNames) {
    const filePath = path.join(dir, fileName);
    const fullFilePath = path.join(RECIPE_DIR, filePath);
    const fstat = await fs.promises.stat(fullFilePath);

    if (fstat.isDirectory()) {
      yield* listRecipesDir(filePath);
    }

    if (fstat.isFile()) {
      yield await getRecipe(filePath);
    }
  }
}

export async function listRecipesByType(type: string): Promise<Recipe[]> {
  const recipes = await listRecipes();

  return recipes.filter((recipe) => recipe.type === type);
}

export async function listRecipesByTag(tag: string): Promise<Recipe[]> {
  return (await listRecipes()).filter((recipe) => recipe.tags.includes(tag));
}

export async function listTags(): Promise<string[]> {
  const set = new Set<string>();
  const recipes = await listRecipes();

  for (const recipe of recipes) {
    for (const tag of recipe.tags) {
      set.add(tag);
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
