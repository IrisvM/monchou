import { Recipe } from '../../api/recipes';
import Image from 'next/image';
import RecipeMeta from '../RecipeMeta';
import RecipeImage from '../RecipeImage';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <li
      key={recipe.slug}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow border border-gray-100 hover:border-fuchsia-100"
    >
      <a
        href={`/recepten/${recipe.type}/${recipe.slug}`}
        className="flex flex-1 flex-col p-8"
      >
        <RecipeImage title={recipe.title} image={recipe.image} />
        <h3 className="mt-6 text-sm font-medium text-gray-900">
          {recipe.title}
        </h3>
        <RecipeMeta tags={recipe.tags} type={recipe.type} />
      </a>
    </li>
  );
}
