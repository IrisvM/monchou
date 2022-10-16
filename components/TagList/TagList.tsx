import TagLink from '../Tag/TagLink';

export default function TagList({ tags }: { tags: string[] }) {
  return (
    <>
      {tags.sort().map((tag) => (
        <TagLink href={`/recepten/tags/${tag}`} tag={tag} key={tag} />
      ))}
    </>
  );
}
