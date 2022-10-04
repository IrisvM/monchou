import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type Recipe = {
  title: string;
  ingredients: { quantity: number; unit: string; title: string }[];
  serving: string;
  tags: string[];
  slug: string;
  content: string;
  type: string;
};

export type SearchContent = {
  slug: string;
  search: string;
}[];

export async function getRecipe(name: string): Promise<Recipe> {
  const fileContents = await fs.promises.readFile(
    `${RECIPE_DIR}/${name}.md`,
    'utf8'
  );
  const { data, content } = matter(fileContents);

  const result = await remark().use(html).process(content);

  return {
    ...data,
    content: result.toString(),
  } as Recipe;
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

export async function searchRecipes(): Promise<SearchContent> {
  return (await listRecipes()).map((r) => ({
    search: r.title,
    slug: r.slug,
  }));
}
