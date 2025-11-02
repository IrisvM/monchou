'use client';

import { ReactNode, use } from 'react';
import {
  RecipeSelection,
  SelectionContext,
} from '../../context/SelectionContext';

type Props = {
  recipe: RecipeSelection;
};
export default function SelectedButton({ recipe }: Props): ReactNode {
  const { has, add, remove, isLoaded } = use(SelectionContext);

  if (!isLoaded) {
    return null;
  }

  return (
    <button
      type="button"
      className="bg-fuchsia-800 hover:bg-fuchsia-700 focus:bg-fuchsia-700 text-white py-2 px-4 rounded-md mt-2"
      onClick={() => (has(recipe) ? remove(recipe) : add(recipe))}
    >
      {has(recipe) ? 'Verwijder van selectie' : 'Voeg toe aan selectie'}
    </button>
  );
}
