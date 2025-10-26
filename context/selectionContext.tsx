'use client';

import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

export type RecipeSelection = {
  type: string;
  slug: string;
};

type SelectionContextType = {
  isLoaded: boolean;
  selectedRecipes: RecipeSelection[];
  clear: () => void;
  has(recipe: RecipeSelection): boolean;
  add(recipe: RecipeSelection): void;
  remove(recipe: RecipeSelection): void;
};

export const SelectionContext = createContext<SelectionContextType>({
  isLoaded: false,
  selectedRecipes: [],
  clear: () => {},
  has: () => false,
  add: () => {},
  remove: () => {},
});

export function SelectionContextProvider({
  children,
}: PropsWithChildren): ReactNode {
  const [selectedRecipes, setSelectedRecipes] = useState<RecipeSelection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const clear = useCallback(() => setSelectedRecipes([]), []);

  const has = useCallback(
    (recipe: RecipeSelection) =>
      selectedRecipes.some(
        (r) => r.slug === recipe.slug && r.type === recipe.type
      ),
    [selectedRecipes]
  );

  const add = useCallback(
    (recipe: RecipeSelection) => {
      if (!has(recipe)) {
        setSelectedRecipes((prev) => [...prev, recipe]);
      }
    },
    [has]
  );

  const remove = useCallback((recipe: RecipeSelection) => {
    setSelectedRecipes((prev) =>
      prev.filter((r) => r.slug !== recipe.slug || r.type !== recipe.type)
    );
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('selectedRecipes');
    if (stored) {
      try {
        const parsed: RecipeSelection[] = JSON.parse(stored);
        setSelectedRecipes(parsed);
      } catch {
        // ignore
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem('selectedRecipes', JSON.stringify(selectedRecipes));
  }, [selectedRecipes, isLoaded]);

  return (
    <SelectionContext.Provider
      value={{ isLoaded, selectedRecipes, clear, has, add, remove }}
    >
      {children}
    </SelectionContext.Provider>
  );
}
