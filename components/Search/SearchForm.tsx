'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

export default function SearchForm(): ReactNode {
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
        className="block w-full bg-fuchsia-200 rounded-md border-gray-300 pl-10 outline-0 focus:outline-2 focus:outline-fuchsia-500 sm:text-sm py-3 px-6"
        placeholder="Zoeken..."
      />
    </form>
  );
}
