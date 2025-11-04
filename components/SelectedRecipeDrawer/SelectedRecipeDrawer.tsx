import React, { ReactNode, useEffect, useState } from 'react';
import { type RecipeSelection } from '../../context/SelectionContext';
import SelectedRecipeTabs from './SelectedRecipeTabs';
import SelectedRecipeList from './SelectedRecipeList';
import DrawerActions from './DrawerActions';
import IngredientsList from './IngredientsList';
import { Ingredient } from '@/api/shoplist';

type Props = {
  ingredients: Ingredient[];
  urls: { [shop: string]: string };
  selectedRecipes: RecipeSelection[];
  onQuantityChange: (
    recipe: { type: string; slug: string },
    quantity: number
  ) => void;
  onClear: () => void;
};
export default function SelectedRecipeDrawer({
  selectedRecipes,
  ingredients,
  urls,
  onQuantityChange,
  onClear,
}: Props): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'recipes' | 'ingredients'>(
    'recipes'
  );
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    if (selectedRecipes.length > 0 && !isOpen) {
      setNudge(true);
    }
  }, [selectedRecipes.length]);

  return (
    <aside
      className={[
        'fixed bottom-0 left-10 right-10 lg:left-auto  lg:w-72 rounded-t-xl border overflow-hidden transition-transform border-fuchsia-700 bg-white shadow-lg',
        isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-40px)]',
        nudge ? 'animate-nudge' : '',
      ]
        .filter((c) => !!c)
        .join(' ')}
      onAnimationEnd={() => setNudge(false)}
    >
      <button
        type="button"
        className="h-10 w-full bg-fuchsia-700 text-fuchsia-50 px-4 py-2 cursor-pointer"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <h1 className="font-bold text-center">
          {selectedRecipes.length} geselecteerde recepten
        </h1>
      </button>
      <div className="flex flex-col">
        <SelectedRecipeTabs
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />

        <div className="min-h-12 max-h-60 lg:max-h-96  overflow-y-scroll">
          {selectedTab === 'recipes' && (
            <SelectedRecipeList
              recipes={selectedRecipes}
              onQuantityChange={onQuantityChange}
            />
          )}
          {selectedTab === 'ingredients' && (
            <IngredientsList ingredients={ingredients} />
          )}
        </div>
        <DrawerActions urls={urls} onClear={onClear} />
      </div>
    </aside>
  );
}
