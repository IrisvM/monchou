import { useEffect, useState } from 'react';

export default function usePrevious<T>(value: T): T | undefined {
  const [previous, setPrevious] = useState<T>();

  useEffect(() => {
    setPrevious(value);
  }, [value]);

  return previous;
}
