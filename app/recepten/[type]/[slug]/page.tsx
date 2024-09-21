import IngredientList from '@/components/IngredientList/IngredientList';
import RecipeImage from '@/components/RecipeImage';
import RecipeMeta from '@/components/RecipeMeta';
import WYSIWYG from '@/components/WYSIWYG';
import { getRecipeByTypeAndSlug, listRecipes } from '@/api/recipes';
import Header from '@/components/Header';

export default async function Recipe({
  params: { type, slug },
}: {
  params: { type: string; slug: string };
}) {
  const { image, title, tags, serving, ingredients, content } =
    await getRecipeByTypeAndSlug(type, slug);
  return (
    <>
      <Header>{title}</Header>
      <section className="mb-3">
        <h2 className="text-2xl font-bold">Meer over</h2>
        <RecipeImage className="mt-4" image={image} title={title} />
        <RecipeMeta
          className="mt-4"
          serving={serving}
          tags={tags}
          type={type}
        />
      </section>
      <section className="mb-3">
        <h2 className="text-2xl font-bold">Ingredienten</h2>
        <IngredientList ingredients={ingredients} />
      </section>
      <section className="mb-3">
        <h2 className="text-2xl font-bold">Stappen</h2>
        <WYSIWYG content={content} headingOffset={2} />
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const recipes = await listRecipes();

  return recipes.map((recipe) => ({
    type: recipe.type,
    slug: recipe.slug,
  }));
}
