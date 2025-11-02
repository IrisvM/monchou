'use client';

import React from 'react';

type SelectedRecipeTabsProps = {
  selectedTab: 'recipes' | 'ingredients';
  onTabChange: (tab: 'recipes' | 'ingredients') => void;
};

export default function SelectedRecipeTabs({
  selectedTab,
  onTabChange,
}: SelectedRecipeTabsProps): React.ReactNode {
  return (
    <div
      role="tablist"
      className="px-4 pt-1 pb-2 flex gap-5 justify-around bg-fuchsia-700 text-fuchsia-50"
    >
      <button
        type="button"
        aria-controls="selected-recipe-tabpanel"
        role="tab"
        aria-selected={selectedTab === 'recipes' ? 'true' : 'false'}
        className={
          selectedTab === 'recipes'
            ? 'underline cursor-pointer'
            : 'cursor-pointer'
        }
        onClick={() => onTabChange('recipes')}
      >
        Recepten
      </button>

      <button
        type="button"
        role="tab"
        aria-controls="selected-recipe-tabpanel"
        aria-selected={selectedTab === 'ingredients' ? 'true' : 'false'}
        className={
          selectedTab === 'ingredients'
            ? 'underline cursor-pointer'
            : 'cursor-pointer'
        }
        onClick={() => onTabChange('ingredients')}
      >
        Ingredienten
      </button>
    </div>
  );
}
