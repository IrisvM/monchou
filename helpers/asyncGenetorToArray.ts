export default async function asyncGeneratorToArray<T>(
  gen: AsyncGenerator<T>
): Promise<T[]> {
  const all: T[] = [];

  for await (const item of gen) {
    all.push(item);
  }

  return all;
}
