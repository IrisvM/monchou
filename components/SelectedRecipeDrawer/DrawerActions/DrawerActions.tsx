'use client';

import React from 'react';
import ShopLink from './ShopLink';
import ClearAllButton from './ClearAllButton';

type DrawerActionsProps = {
  onClear: () => void;
};

export default function DrawerActions({
  onClear,
}: DrawerActionsProps): React.ReactNode {
  return (
    <div className="flex-0 flex flex-row justify-between border-t border-gray-400 py-2 px-6">
      <ShopLink />
      <ClearAllButton onClear={onClear} />
    </div>
  );
}
