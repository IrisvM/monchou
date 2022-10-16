import RecipeMeta from '../../../components/RecipeMeta';
import WYSIWYG from '../../../components/WYSIWYG';
import {
  getRecipe,
  getRecipeByTypeAndSlug,
  listRecipes,
  listTags,
  Recipe as RecipeType,
} from '../../api/recipes';

type Props = { recipe: RecipeType };

export default function Recipe({
  recipe: { ingredients, tags, content, serving, type },
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
    type: string;
  };
};

export async function getStaticProps({ params }: Params): Promise<{
  props: { title: string; recipe: RecipeType };
}> {
  const recipe = await getRecipeByTypeAndSlug(params.type, params.slug);

  return {
    props: {
      title: recipe.title,
      recipe,
    },
  };
}

export async function getStaticPaths() {
  const recipes = await listRecipes();

  return {
    paths: recipes.map((recipe) => {
      return {
        params: {
          type: recipe.type,
          slug: recipe.slug,
        },
      };
    }),
    fallback: false,
  };
}
