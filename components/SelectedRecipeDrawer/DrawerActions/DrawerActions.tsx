'use client';

import React from 'react';
import ShopLink from './ShopLink';
import ClearAllButton from './ClearAllButton';

type DrawerActionsProps = {
  urls: { [shop: string]: string };
  onClear: () => void;
};

export default function DrawerActions({
  urls,
  onClear,
}: DrawerActionsProps): React.ReactNode {
  return (
    <div className="flex-0 flex flex-row justify-between border-t border-gray-400 py-2 px-6">
      <div className="flex flex-1 flex-row">
        <ShopLink url={urls.ah} />
      </div>
      <ClearAllButton onClear={onClear} />
    </div>
  );
}
