import ahRaw from './ah.json';
import aliasesRaw from './aliases.json';

const shops = {
  ah: ahRaw as Record<string, { id: string; quantity: number }>,
} as const;

const aliases = aliasesRaw as Record<string, string>;

export type Shops = keyof typeof shops;

export { shops, aliases };
