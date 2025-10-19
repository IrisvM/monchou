import { ReactNode } from 'react';

export default function RecipeCardLoading(): ReactNode {
  return (
    <li className="animate-pulse col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow border border-gray-100 hover:border-fuchsia-100">
      <div className="flex flex-1 flex-col p-8 justify-center items-center">
        <div className="mx-auto h-32 w-32 flex-shrink-0 animate-pulse rounded-full bg-gray-200 text-center align-middle leading-[8rem] text-xl font-bold"></div>
        <div className="mt-6 h-5 w-36 text-sm bg-gray-200 rounded-full"></div>

        <div className="mt-1 flex flex-grow flex-col justify-between">
          <p className="text-sm text-sm h-5 rounded-full bg-gray-200 w-24"></p>
        </div>

        <div className="mt-3 mb-3 flex flex-wrap justify-center flex-row">
          <div className="rounded-full h-5 text-xs w-12 h-2 mr-2 mb-2 px-2 py-1 text-xs font-medium bg-indigo-100"></div>
          <div className="rounded-full h-5 text-xs w-12 h-2 mr-2 mb-2 px-2 py-1 text-xs font-medium bg-indigo-100"></div>
          <div className="rounded-full h-5 text-xs w-12 h-2 mr-2 mb-2 px-2 py-1 text-xs font-medium bg-indigo-100"></div>
        </div>
      </div>
    </li>
  );
}
