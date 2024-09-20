'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

type Props = {
  href: string;
  className?: string;
  exact?: boolean;
};

export default function Link({
  href,
  className,
  children,
  exact = false,
}: PropsWithChildren<Props>) {
  const path = usePathname() ?? '';
  const isActive = exact ? path === href : path.indexOf(href) === 0;

  return (
    <a
      href={href}
      className={className}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  );
}
