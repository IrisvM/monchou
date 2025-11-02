import React, { ReactNode, useState } from 'react';
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
  onClear: () => void;
};
export default function SelectedRecipeDrawer({
  selectedRecipes,
  ingredients,
  urls,
  onClear,
}: Props): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'recipes' | 'ingredients'>(
    'recipes'
  );
  return (
    <aside
      className={[
        'fixed bottom-0 left-10 right-10 lg:left-auto  lg:w-72 rounded-t-xl border overflow-hidden transition-transform border-fuchsia-700 bg-white shadow-lg',
        isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-40px)]',
      ].join(' ')}
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
      <div className="min-h-32 flex flex-col">
        <SelectedRecipeTabs
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />
        {selectedTab === 'recipes' && (
          <SelectedRecipeList recipes={selectedRecipes} />
        )}
        {selectedTab === 'ingredients' && (
          <IngredientsList ingredients={ingredients} />
        )}
        <DrawerActions urls={urls} onClear={onClear} />
      </div>
    </aside>
  );
}
