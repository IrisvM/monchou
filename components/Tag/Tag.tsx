import uppercaseFirst from '@/helpers/uppercaseFirst';
import { ReactNode } from 'react';

type Props = {
  tag: string;
};

export default function Tag({ tag }: Props): ReactNode {
  return (
    <span className="rounded-full mr-2 mb-2 px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 active:bg-indigo-800 active:text-indigo-100">
      {uppercaseFirst(tag)}
    </span>
  );
}
