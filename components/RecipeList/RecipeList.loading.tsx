import { ReactNode } from 'react';
import RecipeCardLoading from '../RecipeCard/RecipeCard.loading';

export default function RecipeListLoading(): ReactNode {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <RecipeCardLoading />
      <RecipeCardLoading />
      <RecipeCardLoading />
    </ul>
  );
}
