import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

type Props = {
  href: string;
  className?: string;
  activeClassName?(isActive: boolean): string;
  exact?: boolean;
};

export default function Link({
  href,
  className,
  activeClassName,
  children,
  exact = false,
}: PropsWithChildren<Props>) {
  const router = useRouter();
  const isActive = exact
    ? router.asPath === href
    : router.asPath.indexOf(href) === 0;

  return (
    <a
      href={href}
      className={`${className} ${activeClassName?.(isActive)}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </a>
  );
}
