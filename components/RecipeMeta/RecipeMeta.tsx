import uppercaseFirst from '../../helpers/uppercaseFirst';
import { Recipe } from '../../pages/api/recipes';

export default function RecipeMeta({ type, tags, serving }: Partial<Recipe>) {
  return (
    <dl className="mt-1 flex flex-grow flex-col justify-between">
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
              <span
                key={tag}
                className="rounded-full mr-2 bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800"
              >
                {uppercaseFirst(tag)}
              </span>
            ))}
          </dd>
        </>
      )}
    </dl>
  );
}
