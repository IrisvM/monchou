import { Recipe } from '../../api/recipes';
import RecipeMeta from '../RecipeMeta';
import RecipeImage from '../RecipeImage';
import { ReactNode } from 'react';
import SelectButton from './SelectButton';

export default function RecipeCard({ recipe }: { recipe: Recipe }): ReactNode {
  return (
    <li
      className={[
        'relative col-span-1 flex rounded-lg text-center shadow ',
        'divide-y divide-gray-200 bg-white border border-fuchsia-100',
        'hover:scale-105 lg:hover:scale-110 hover:rotate-2 odd:hover:-rotate-2 transition-transform duration-300',
        'animat',
      ].join(' ')}
    >
      <div className="flex flex-1">
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
        <SelectButton recipe={recipe} />
      </div>
    </li>
  );
}
