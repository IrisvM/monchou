export default function classNames(
  ...items: (string | false | undefined)[]
): string {
  return items.filter((item) => !!item).join(' ');
}
