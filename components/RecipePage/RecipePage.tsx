import TagList from '../TagList';
import { ReactNode } from 'react';
import { RecipesFromBackend } from './RecipesFromBackend';

type Props = {
  tags: string[];
  tag?: string;
  type?: string;
};

export default function RecipeListPage({ tag, tags, type }: Props): ReactNode {
  return (
    <>
      <div className="mb-4">
        <TagList type={type} tags={tags} />
      </div>
      <RecipesFromBackend tag={tag} type={type} />
    </>
  );
}
