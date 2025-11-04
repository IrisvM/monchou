'use client';

import React from 'react';

type ClearAllButtonProps = {
  onClear: () => void;
};

export default function ClearAllButton({
  onClear,
}: ClearAllButtonProps): React.ReactNode {
  return (
    <button
      type="button"
      className="text-fuchsia-900 px-2 py-1 rounded-md text-sm cursor-pointer"
      onClick={onClear}
    >
      Alles wissen
    </button>
  );
}
