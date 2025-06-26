import type { IPageLayoutProps } from '../../types/types';

export default function PageLayout({ children, headerLeft, headerRight }: IPageLayoutProps) {
  return (
    <div className="h-screen flex flex-col items-center bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white">
      <div className="flex justify-between items-center p-6 w-full">
        {headerLeft ?? <div />}
        {headerRight ?? <div />}
      </div>
      {children}
    </div>
  );
}
