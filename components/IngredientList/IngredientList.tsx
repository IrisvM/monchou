import { Recipe } from '../../api/recipes';
import IngredientItem from './IngredientItem';

export default function IngredientList({
  ingredients,
}: {
  ingredients: Recipe['ingredients'];
}) {
  return (
    <ul className="list-disc ml-5">
      {ingredients.map((ingredient) => (
        <IngredientItem key={ingredient.title} ingredient={ingredient} />
      ))}
    </ul>
  );
}
