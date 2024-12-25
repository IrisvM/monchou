import { ReactNode } from 'react';
import TagLink from '../Tag/TagLink';

export default function TagList({
  tags,
  type,
}: {
  tags: string[];
  type?: string;
}): ReactNode {
  const path = type !== undefined ? `/recepten/${type}` : `/recepten`;
  return (
    <div className="flex flex-wrap">
      {tags.sort().map((tag) => (
        <TagLink href={`${path}/tags/${tag}`} tag={tag} key={tag} />
      ))}
    </div>
  );
}
