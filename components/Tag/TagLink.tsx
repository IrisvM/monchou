import { ReactNode } from 'react';
import uppercaseFirst from '../../helpers/uppercaseFirst';
import Link from '../Link';

export default function TagLink({
  tag,
  href,
}: {
  tag: string;
  href: string;
}): ReactNode {
  return (
    <Link
      className="rounded-full mr-2 mb-2 px-2 py-1 text-xs font-medium bg-indigo-100 hover:scale-105 transition-all duration-300 hover:bg-fuchsia-500 hover:text-white"
      activeClass="!text-indigo-100 !bg-indigo-800"
      href={href}
    >
      {uppercaseFirst(tag)}
    </Link>
  );
}
