'use client';

import React from 'react';
import { RecipeSelection } from '../../context/SelectionContext';

type SelectedRecipeListProps = {
  recipes: RecipeSelection[];
  onQuantityChange: (
    recipe: { type: string; slug: string },
    quantity: number
  ) => void;
};

export default function SelectedRecipeList({
  recipes,
  onQuantityChange,
}: SelectedRecipeListProps): React.ReactNode {
  return (
    <ul
      role="tabpanel"
      id="selected-recipe-tabpanel"
      className="mb-2 flex-1 px-4 py-2 text-gray-500 text-sm"
    >
      {recipes.map((recipe) => (
        <li
          key={`${recipe.type}-${recipe.slug}`}
          className="flex flex-row gap-3"
        >
          <input
            className="flex-0"
            size={1}
            type="number"
            value={recipe.quantity}
            onChange={(e) =>
              onQuantityChange(recipe, Number(e.currentTarget.value))
            }
          />
          <p className="flex-1">{recipe.title}</p>
        </li>
      ))}
    </ul>
  );
}
