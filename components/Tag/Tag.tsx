import classNames from '../../helpers/classNames';
import uppercaseFirst from '../../helpers/uppercaseFirst';
import { tagClassNames, tagDefaultColors } from './classNames';

type Props = {
  tag: string;
};

export default function Tag({ tag }: Props) {
  return (
    <span className={classNames(tagClassNames, tagDefaultColors)}>
      {uppercaseFirst(tag)}
    </span>
  );
}
