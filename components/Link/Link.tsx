'use client';

import classNames from '@/helpers/classNames';
import { usePathname } from 'next/navigation';
import { PropsWithChildren, ReactNode } from 'react';

type Props = {
  href: string;
  className?: string;
  activeClass?: string;
  exact?: boolean;
};

export default function Link({
  href,
  className,
  activeClass: activeClassName,
  children,
  exact = false,
}: PropsWithChildren<Props>): ReactNode {
  const path = usePathname() ?? '';
  const isActive = exact ? path === href : path.indexOf(href) === 0;

  return (
    <a
      href={href}
      className={classNames(className, isActive ? activeClassName : undefined)}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  );
}
