import uppercaseFirst from '../../helpers/uppercaseFirst';
import Link from '../Link';

export default function TagLink({ tag, href }: { tag: string; href: string }) {
  return (
    <Link
      className="rounded-full mr-2 mb-2 px-2 py-1 text-xs font-medium bg-indigo-100"
      activeClass="!text-indigo-100 !bg-indigo-800"
      href={href}
    >
      {uppercaseFirst(tag)}
    </Link>
  );
}
