'use client';

import { ReactNode, Suspense } from 'react';
import SearchFallback from './SearchFallback';
import SearchForm from './SearchForm';

export default function Search(): ReactNode {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchForm />
    </Suspense>
  );
}
