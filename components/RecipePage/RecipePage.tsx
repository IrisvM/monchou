import TagList from '../TagList';
import { ReactNode, Suspense } from 'react';
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
      <Suspense fallback={<span>Loading...</span>}>
        <RecipesFromBackend tag={tag} type={type} />
      </Suspense>
    </>
  );
}
