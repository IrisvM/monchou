import { Recipe } from '../../api/recipes';
import Link from '../Link';

export default function IngredientItem({
  ingredient,
}: {
  ingredient: Recipe['ingredients'][number];
}) {
  if (ingredient.to) {
    return (
      <li>
        <Link className="text-indigo-600" href={ingredient.to}>
          {ingredient.quantity} {ingredient.unit} {ingredient.title}
        </Link>
      </li>
    );
  }

  return (
    <li>
      {ingredient.quantity} {ingredient.unit} {ingredient.title}
    </li>
  );
}
