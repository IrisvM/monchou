import IngredientList from '@/components/IngredientList/IngredientList';
import RecipeImage from '@/components/RecipeImage';
import RecipeMeta from '@/components/RecipeMeta';
import Content from '@/components/Content';
import { Recipe } from '@/api/recipes';
import { ReactNode } from 'react';
import SelectedButton from './SelectedButton';

type Props = {
  recipe: Recipe;
};

export default function RecipeDetailPage({ recipe }: Props): ReactNode {
  const { image, title, tags, serving, ingredients, content, type } = recipe;

  return (
    <>
      <section className="mb-3">
        <RecipeImage className="mt-4" image={image} title={title} />
        <RecipeMeta
          className="mt-4"
          serving={serving}
          tags={tags}
          type={type}
        />
        <SelectedButton recipe={recipe} />
      </section>
      <section className="mb-3">
        <h2 className="text-2xl font-bold">Ingredienten</h2>
        <IngredientList ingredients={ingredients} />
      </section>
      <section className="mb-3">
        <h2 className="text-2xl font-bold">Stappen</h2>
        <Content content={content} headingOffset={2} />
      </section>
    </>
  );
}
