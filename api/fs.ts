import matter from 'gray-matter';
import { readdir, readFile, stat } from 'node:fs/promises';
import { remark } from 'remark';
import { Recipe } from './recipes';
import html from 'remark-html';
import path from 'node:path';

const RECIPE_DIR = `${process.cwd()}/data/recipes`;

export async function readAllRecipes(): Promise<Recipe[]> {
  const allRecipes = [];

  for await (const recipe of listRecipesDir('')) {
    allRecipes.push(recipe);
  }

  return allRecipes;
}

export async function readRecipe(path: string): Promise<Recipe> {
  const fileContents = await readFile(`${RECIPE_DIR}/${path}`, 'utf8');

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

async function* listRecipesDir(dir: string): AsyncGenerator<Recipe> {
  const fileNames = await readdir(path.join(RECIPE_DIR, dir));

  for (const fileName of fileNames) {
    if (fileName.startsWith('.')) {
      continue;
    }

    const filePath = path.join(dir, fileName);
    const fullFilePath = path.join(RECIPE_DIR, filePath);
    const fstat = await stat(fullFilePath);

    if (fstat.isDirectory()) {
      yield* listRecipesDir(filePath);
    }

    if (fstat.isFile()) {
      yield await readRecipe(filePath);
    }
  }
}
