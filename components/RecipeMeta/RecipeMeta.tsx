import classNames from '../../helpers/classNames';
import uppercaseFirst from '../../helpers/uppercaseFirst';
import { Recipe } from '../../api/recipes';
import Tag from '../Tag';
import { ReactNode } from 'react';

export default function RecipeMeta({
  type,
  tags,
  serving,
  className,
}: Partial<Recipe> & { className?: string }): ReactNode {
  return (
    <dl
      className={classNames(
        'mt-1 flex flex-grow flex-col justify-between',
        className
      )}
    >
      {type && (
        <>
          <dt className="sr-only">Soort</dt>
          <dd className="text-sm text-gray-500">{uppercaseFirst(type)}</dd>
        </>
      )}
      {serving && (
        <>
          <dt className="sr-only">Portie</dt>
          <dd className="text-sm text-gray-500">{serving}</dd>
        </>
      )}
      {tags && (
        <>
          <dt className="sr-only">Labels</dt>
          <dd className="mt-3 mb-3">
            {tags.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </dd>
        </>
      )}
    </dl>
  );
}
