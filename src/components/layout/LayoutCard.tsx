import clsx from 'clsx';
import type { ILayoutCardModel } from '../../types/types.ts';

export default function LayoutCard({ title, children, className }: ILayoutCardModel) {
  return (
    <div
      className={clsx(
        'w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-7xl bg-white dark:bg-zinc-700 rounded-xl shadow-xl p-6 md:p-8',
        'border border-zinc-200 dark:border-zinc-600',
        'transition-colors duration-200',
        className
      )}
    >
      {title && <h1 className="text-xl lg:text-2xl font-semibold mb-8 text-zinc-900 dark:text-white">{title}</h1>}
      <div className="flex flex-col gap-4 items-center">{children}</div>
    </div>
  );
}
