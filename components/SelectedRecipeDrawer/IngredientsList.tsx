'use client';

import React from 'react';

type Ingredients = {
  quantity: number;
  name: string;
};

type Props = {
  ingredients: Ingredients[];
};

export default function IngredientsList({
  ingredients,
}: Props): React.ReactNode {
  return (
    <ul
      role="tabpanel"
      id="selected-recipe-tabpanel"
      className="mb-2 flex-1 px-4 py-2 text-gray-500 text-sm"
    >
      {ingredients.map((ingredient) => (
        <li key={ingredient.name}>
          {ingredient.quantity} - {ingredient.name}
        </li>
      ))}
    </ul>
  );
}
