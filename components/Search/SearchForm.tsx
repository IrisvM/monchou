'use client';

import { usePathname, useSearchParams } from 'next/navigation';

function getTypeFromPath(currenPath: string): string | undefined {
  const matches = /\/recepten\/([^/]+)\/.*/.exec(currenPath);

  if (matches === null) {
    return undefined;
  }

  return matches[1] ?? undefined;
}

export default function SearchForm() {
  const path = usePathname();
  const searchParams = useSearchParams();

  const searchPath = `/recepten`;
  const query = searchParams?.get('query') ?? '';

  return (
    <form action={searchPath} method="get">
      <input
        type="search"
        name="query"
        id="searchQuery"
        defaultValue={query}
        className="block w-full bg-fuchsia-200 rounded-md border-gray-300 pl-10 focus:border-fuchsia-500 focus:ring-fuchsia-500 sm:text-sm"
        placeholder="Zoeken..."
      />
    </form>
  );
}
