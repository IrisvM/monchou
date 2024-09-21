'use client';

import { Suspense } from 'react';
import SearchFallback from './SearchFallback';
import SearchForm from './SearchForm';

export default function Search() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchForm />
    </Suspense>
  );
}
