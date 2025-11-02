'use client';

import { ReactNode, use } from 'react';
import { SelectionContext } from '../../context/SelectionContext';
import { Recipe } from '../../api/recipes';

type Props = {
  recipe: Recipe;
};

export default function SelectButton({ recipe }: Props): ReactNode {
  const { has, add, remove, isLoaded } = use(SelectionContext);
  const isSelected = has(recipe);

  if (!isLoaded) {
    return null;
  }

  return (
    <button
      role="checkbox"
      aria-selected={isSelected}
      aria-label={
        isSelected
          ? 'Verwijder recept uit selectie'
          : 'Voeg recept toe aan selectie'
      }
      type="button"
      className={[
        'absolute right-4 top-4 w-10 h-10 font-bold text-xl text-center rounded-full',
        'bg-fuchsia-100 text-gray-400',
        'hover:text-fuchsia-50 focus:text-fuchsia-50',
        'hover:bg-fuchsia-700 focus:bg-fuchsia-700',
        'focus:outline-none focus:ring-2 focus:ring-fuchsia-700 focus:ring-offset-2',
        isSelected ? 'ring-2 ring-fuchsia-200 ring-offset-2' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => {
        if (isSelected) {
          remove(recipe);
        } else {
          add(recipe);
        }
      }}
    >
      {isSelected ? '-' : '+'}
    </button>
  );
}
