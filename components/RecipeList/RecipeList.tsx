import { Recipe } from '../../pages/api/recipes';
import RecipeCard from '../RecipeCard';

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.slug} recipe={recipe} />
      ))}
    </ul>
  );
}
