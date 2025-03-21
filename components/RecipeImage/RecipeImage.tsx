import Image from 'next/image';
import classNames from '../../helpers/classNames';
import { ReactNode } from 'react';

export default function RecipeImage({
  image,
  title,
  className,
}: {
  className?: string;
  image: string | null;
  title: string;
}): ReactNode {
  return image == null ? (
    <div
      className={classNames(
        'mx-auto h-32 w-32 flex-shrink-0 rounded-full bg-gray-200 text-center align-middle leading-[8rem] text-xl font-bold',
        className
      )}
    >
      {title.substring(0, 2).toUpperCase()}
    </div>
  ) : (
    <Image
      className={classNames(
        'mx-auto h-32 w-32 flex-shrink-0 rounded-full bg-gray-200 text-center align-middle leading-[8rem] text-xl font-bold',
        className
      )}
      src={`/images/${image}`}
      alt={title}
      width="128"
      height="128"
    />
  );
}
