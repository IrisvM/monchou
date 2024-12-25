import { Recipe } from '../../api/recipes';
import TagList from '../TagList';
import FilteredRecipes from '../FilteredRecipes';
import { ReactNode } from 'react';

type Props = {
  recipes: Recipe[];
  tags: string[];
  type?: string;
};

export default function RecipeListPage({
  recipes,
  tags,
  type,
}: Props): ReactNode {
  return (
    <>
      <div className="mb-4">
        <TagList type={type} tags={tags} />
      </div>
      <FilteredRecipes recipes={recipes} />
    </>
  );
}
