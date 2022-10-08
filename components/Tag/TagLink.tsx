import uppercaseFirst from '../../helpers/uppercaseFirst';
import Link from '../Link';
import { tagActiveColors, tagClassNames, tagDefaultColors } from './classNames';

export default function TagLink({ tag, href }: { tag: string; href: string }) {
  return (
    <Link
      className={tagClassNames}
      activeClassName={(isActive) =>
        isActive ? tagActiveColors : tagDefaultColors
      }
      href={href}
    >
      {uppercaseFirst(tag)}
    </Link>
  );
}
