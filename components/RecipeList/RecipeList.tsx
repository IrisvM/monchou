import { ReactNode, use } from 'react';
import { Recipe } from '../../api/recipes';
import RecipeCard from '../RecipeCard';

export default function RecipeList({
  recipes,
}: {
  recipes: Promise<Recipe[]>;
}): ReactNode {
  const resolvedRecipes = use(recipes);

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {resolvedRecipes.map((recipe) => (
        <RecipeCard key={recipe.key} recipe={recipe} />
      ))}
    </ul>
  );
}
