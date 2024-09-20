import useSearch from '../../hooks/useSearch';
import { Recipe } from '../../api/recipes';
import RecipeList from '../RecipeList';
import TagList from '../TagList';

type Props = {
  recipes: Recipe[];
  tags: string[];
  type?: string;
};

export default function RecipeListPage({ recipes, tags, type }: Props) {
  const filteredRecipes = useSearch(recipes);

  return (
    <>
      <div className="mb-4">
        <TagList type={type} tags={tags} />
      </div>
      <RecipeList recipes={filteredRecipes} />
    </>
  );
}
