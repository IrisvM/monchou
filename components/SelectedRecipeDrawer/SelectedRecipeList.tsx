'use client';

import React from 'react';
import { RecipeSelection } from '../../context/SelectionContext';

type SelectedRecipeListProps = {
  recipes: RecipeSelection[];
};

export default function SelectedRecipeList({
  recipes,
}: SelectedRecipeListProps): React.ReactNode {
  return (
    <ul
      role="tabpanel"
      id="selected-recipe-tabpanel"
      className="mb-2 flex-1 px-4 py-2 text-gray-500 text-sm"
    >
      {recipes.map((recipe) => (
        <li key={`${recipe.type}-${recipe.slug}`}>1 - {recipe.title}</li>
      ))}
    </ul>
  );
}
