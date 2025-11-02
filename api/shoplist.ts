import { shops, aliases, Shops } from '../data/shopping';
import { getRecipeByTypeAndSlug } from './recipes';

export type Ingredient = {
  name: string;
  quantity: number;
  shopIds: { [shop in Shops]?: string };
};

export type ShoplistOutput = {
  urls: { [shop in Shops]?: string };
  ingredients: Ingredient[];
};

export function hasIngredient(shop: Shops, ingredient: string): boolean {
  const key = aliases[ingredient.toLowerCase()] ?? ingredient.toLowerCase();
  return shops[shop][key] !== undefined;
}

export function getIngredient(
  shop: Shops,
  ingredient: string
): { name: string; id: string; quantity: number } | undefined {
  const key = aliases[ingredient.toLowerCase()] ?? ingredient.toLowerCase();
  const found = shops[shop][key];

  if (!found) {
    return undefined;
  }

  return {
    id: found.id,
    name: key,
    quantity: found.quantity,
  };
}

export async function getShopListUrls(
  recipes: string[]
): Promise<ShoplistOutput> {
  const ingredients = (
    await Promise.all(
      recipes.map(async (typeSlug) => {
        const [type, slug] = typeSlug.split('/');
        try {
          const recipe = await getRecipeByTypeAndSlug(type, slug);

          return recipe.ingredients.map((ingredient) => {
            const title = ingredient.title.toLowerCase();

            return {
              key: aliases[title] ?? title,
              quantity: ingredient.quantity,
            };
          });
        } catch {
          return [];
        }
      })
    )
  ).flat();

  const shopItems = ingredients
    .map(({ key, quantity }) => {
      const found = shops.ah[key];

      return {
        id: found ? found.id : undefined,
        name: key,
        shopIds: { ah: found ? found.id : undefined },
        soldPer: found ? found.quantity : 1,
        quantity: quantity,
      };
    })
    .filter(
      (
        item
      ): item is {
        id: string;
        name: string;
        quantity: number;
        shopIds: { [shop in Shops]: string };
        soldPer: number;
      } => item.id !== undefined
    );

  const cart = shopItems.reduce(
    (acc, { id, name, shopIds, quantity, soldPer }) => {
      const existing = acc.get(name) || {
        name,
        quantity: 0,
        shopIds: { ah: id },
      };

      acc.set(id, {
        name,
        shopIds: existing.shopIds ?? shopIds,
        quantity: existing.quantity + quantity / soldPer,
      });

      return acc;
    },
    new Map<string, Ingredient>()
  );

  return {
    ingredients: [...cart.values()].map((ingredient) => ({
      name: ingredient.name,
      shopIds: ingredient.shopIds,
      quantity: Math.ceil(ingredient.quantity),
    })),
    urls: {
      ah: `https://www.ah.nl/mijnlijst/add-multiple?${[...cart.entries()].map(([id, ingredient]) => `p=${id}:${Math.ceil(ingredient.quantity)}`).join('&')}`,
    },
  };
}
