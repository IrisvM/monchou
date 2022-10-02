import RecipeMeta from '../../components/RecipeMeta';
import WYSIWYG from '../../components/WYSIWYG';
import { getRecipe, listRecipes, Recipe as RecipeType } from '../api/recipes';

type Props = RecipeType;

export default function Recipe({
  ingredients,
  tags,
  content,
  serving,
  type,
}: Props) {
  return (
    <>
      <section className="mb-3">
        <h2 className="text-2xl font-bold">Meer over</h2>
        <RecipeMeta serving={serving} tags={tags} type={type} />
      </section>
      <section className="mb-3">
        <h2 className="text-2xl font-bold">Ingredienten</h2>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.title}>
              {ingredient.quantity} {ingredient.unit} {ingredient.title}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-3">
        <h2 className="text-2xl font-bold">Stappen</h2>
        <WYSIWYG content={content} headingOffset={2} />
      </section>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({
  params,
}: Params): Promise<{ props: Props }> {
  return {
    props: await getRecipe(params.slug),
  };
}

export async function getStaticPaths() {
  const recipes = await listRecipes();

  return {
    paths: recipes.map((recipe) => {
      return {
        params: {
          slug: recipe.slug,
        },
      };
    }),
    fallback: false,
  };
}
