import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type Recipe = {
  title: string;
  ingredients: { quantity: number; unit: string; title: string; to?: string }[];
  serving: string;
  tags: string[];
  slug: string;
  content: string;
  type: string;
  key: string;
  filename: string;
};

export async function getRecipe(name: string): Promise<Recipe> {
  const fileContents = await fs.promises.readFile(
    `${RECIPE_DIR}/${name}.md`,
    'utf8'
  );

  try {
    const { data, content } = matter(fileContents);

    const result = await remark().use(html).process(content);
    return {
      ...data,
      slug: data.slug.toLocaleLowerCase(),
      type: data.type.toLocaleLowerCase(),
      tags: data.tags ?? [],
      content: result.toString(),
      filename: name + '.md',
      key: name,
    } as Recipe;
  } catch (err) {
    throw new Error(`Error during parsing ${name}: ${err}`);
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

const RECIPE_DIR = `${process.cwd()}/recipes`;

export async function listRecipes(): Promise<Recipe[]> {
  const recipeFileNames = await fs.promises.readdir(RECIPE_DIR);
  return await Promise.all(
    recipeFileNames
      .map((filename) => filename.replace(/\.md$/, ''))
      .map((name) => getRecipe(name))
  );
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
