'use client';

import React, { use } from 'react';
import { SelectionContext } from '../../context/SelectionContext';
import SelectedRecipeDrawer from './SelectedRecipeDrawer';
import { useShoplist } from '@/hooks/useShoplist';

export default function SelectedRecipeDrawerContainer(): React.ReactNode {
  const { selectedRecipes, clear, setQuantity } = use(SelectionContext);

  const { ingredients, urls } = useShoplist(selectedRecipes);

  return (
    <SelectedRecipeDrawer
      ingredients={ingredients}
      urls={urls}
      selectedRecipes={selectedRecipes}
      onQuantityChange={setQuantity}
      onClear={clear}
    />
  );
}
