'use client';

import React from 'react';

export default function ShopLink({ url }: { url: string }): React.ReactNode {
  return (
    <a href={url} title="Genereer AH boodschappenlijst" className="block">
      <img
        width={32}
        height={32}
        src="/images/logos/ah.svg"
        alt="Albert Heijn logo"
      />
    </a>
  );
}
