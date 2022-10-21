import TagLink from '../Tag/TagLink';

export default function TagList({
  tags,
  type,
}: {
  tags: string[];
  type?: string;
}) {
  const path = type !== undefined ? `/recepten/${type}` : `/recepten`;
  return (
    <>
      {tags.sort().map((tag) => (
        <TagLink href={`${path}/tags/${tag}`} tag={tag} key={tag} />
      ))}
    </>
  );
}
