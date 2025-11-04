'use client';

import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

export type RecipeIdentifier = {
  type: string;
  slug: string;
};

export type RecipeSelection = {
  type: string;
  slug: string;
  title: string;
  quantity: number;
};

type SelectionContextType = {
  isLoaded: boolean;
  selectedRecipes: RecipeSelection[];
  clear: () => void;
  has(recipe: RecipeIdentifier): boolean;
  add(recipe: RecipeIdentifier & { title: string }): void;
  remove(recipe: RecipeIdentifier): void;
  setQuantity(recipe: RecipeIdentifier, quantity: number): void;
};

export const SelectionContext = createContext<SelectionContextType>({
  isLoaded: false,
  selectedRecipes: [],
  clear: () => {},
  has: () => false,
  add: () => {},
  remove: () => {},
  setQuantity: () => {},
});

export function SelectionContextProvider({
  children,
}: PropsWithChildren): ReactNode {
  const [selectedRecipes, setSelectedRecipes] = useState<RecipeSelection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const clear = useCallback(() => setSelectedRecipes([]), []);

  const has = useCallback(
    (recipe: RecipeIdentifier) =>
      selectedRecipes.some(
        (r) => r.slug === recipe.slug && r.type === recipe.type
      ),
    [selectedRecipes]
  );

  const add = useCallback(
    (recipe: RecipeIdentifier & { title: string }) => {
      if (!has(recipe)) {
        setSelectedRecipes((prev) => [
          ...prev,
          {
            quantity: 1,
            slug: recipe.slug,
            type: recipe.type,
            title: recipe.title,
          },
        ]);
      }
    },
    [has]
  );

  const remove = useCallback((recipe: RecipeIdentifier) => {
    setSelectedRecipes((prev) =>
      prev.filter((r) => r.slug !== recipe.slug || r.type !== recipe.type)
    );
  }, []);

  const setQuantity = useCallback(
    (recipe: RecipeIdentifier, quantity: number) => {
      if (isNaN(quantity)) {
        quantity = 1;
      }

      if (quantity < 1) {
        remove(recipe);
        return;
      }

      setSelectedRecipes((prev) =>
        prev.map((r) => {
          if (r.slug === recipe.slug && r.type === recipe.type) {
            return {
              ...r,
              quantity,
            };
          }

          return r;
        })
      );
    },
    [remove]
  );

  useEffect(() => {
    const stored = localStorage.getItem('selectedRecipes');
    if (stored) {
      try {
        const parsed: RecipeSelection[] = JSON.parse(stored);
        setSelectedRecipes(parsed);
      } catch {
        // ignore
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem('selectedRecipes', JSON.stringify(selectedRecipes));
  }, [selectedRecipes, isLoaded]);

  return (
    <SelectionContext.Provider
      value={{
        isLoaded,
        selectedRecipes,
        clear,
        has,
        add,
        remove,
        setQuantity,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}
