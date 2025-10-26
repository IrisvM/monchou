'use client';

import React from 'react';

type Recipe = {
  type: string;
  slug: string;
};

type SelectedRecipeListProps = {
  recipes: Recipe[];
};

export default function SelectedRecipeList({
  recipes,
}: SelectedRecipeListProps): React.ReactNode {
  return (
    <ul
      role="tabpanel"
      id="selected-recipe-tabpanel"
      className="mb-2 flex-1 px-4 py-2 text-gray-500"
    >
      {recipes.map((recipe) => (
        <li key={`${recipe.type}-${recipe.slug}`}>
          {recipe.type} - {recipe.slug}
        </li>
      ))}
    </ul>
  );
}
