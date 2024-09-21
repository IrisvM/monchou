import useSearch from '../../hooks/useSearch';
import { Recipe } from '../../api/recipes';
import RecipeList from '../RecipeList';
import TagList from '../TagList';
import FilteredRecipes from '../FilteredRecipes';

type Props = {
  recipes: Recipe[];
  tags: string[];
  type?: string;
};

export default function RecipeListPage({ recipes, tags, type }: Props) {
  return (
    <>
      <div className="mb-4">
        <TagList type={type} tags={tags} />
      </div>
      <FilteredRecipes recipes={recipes} />
    </>
  );
}
