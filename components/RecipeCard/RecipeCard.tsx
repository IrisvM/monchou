import { Recipe } from '../../api/recipes';
import RecipeMeta from '../RecipeMeta';
import RecipeImage from '../RecipeImage';
import { ReactNode, use } from 'react';
import { SelectionContext } from '../../context/selectionContext';

export default function RecipeCard({ recipe }: { recipe: Recipe }): ReactNode {
  const { has, add, remove, isLoaded } = use(SelectionContext);

  const isSelected = has(recipe);

  return (
    <li className="relative col-span-1 flex divide-y divide-gray-200 rounded-lg bg-white text-center shadow border border-gray-100 hover:border-fuchsia-100">
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
      {isLoaded && (
        <button
          role="checkbox"
          aria-selected={isSelected}
          type="button"
          className={[
            'absolute right-4 top-4 w-10 h-10 font-bold text-xl text-center rounded-full',
            'bg-fuchsia-100 text-gray-400',
            'hover:text-fuchsia-50 focus:text-fuchsia-50',
            'hover:bg-fuchsia-700 focus:bg-fuchsia-700',
            'focus:outline-none focus:ring-2 focus:ring-fuchsia-700 focus:ring-offset-2',
            isSelected ? 'ring-2 ring-fuchsia-200 ring-offset-2' : '',
          ]
            .filter((a) => !!a)
            .join(' ')}
          onClick={() => {
            if (has(recipe)) {
              remove(recipe);
            } else {
              add(recipe);
            }
          }}
        >
          {has(recipe) ? '-' : '+'}
        </button>
      )}
    </li>
  );
}
