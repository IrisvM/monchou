import { Recipe } from '../../pages/api/recipes';
import RecipeMeta from '../RecipeMeta';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <li
      key={recipe.slug}
      className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow border border-gray-100 hover:border-fuchsia-100"
    >
      <a href={`/recepten/${recipe.slug}`} className="flex flex-1 flex-col p-8">
        {/* <img
              className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
              src="#"
              alt=""
            /> */}
        <div className="mx-auto h-32 w-32 flex-shrink-0 rounded-full bg-gray-200 text-center align-middle leading-[8rem] text-xl font-bold">
          {recipe.title.substring(0, 2).toUpperCase()}
        </div>
        <h3 className="mt-6 text-sm font-medium text-gray-900">
          {recipe.title}
        </h3>
        <RecipeMeta tags={recipe.tags} type={recipe.type} />
      </a>
    </li>
  );
}
