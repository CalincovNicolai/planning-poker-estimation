import type {IInputModel} from "../../types/types.ts";
import clsx from "clsx";

export default function Input({className, ...props}: IInputModel) {
    return (
        <input
            {...props}
            className={clsx(
                'w-full max-w-2xl bg-white dark:bg-zinc-800 rounded-xl shadow-md p-2 md:p-4',
                'border border-zinc-200 dark:border-zinc-700',
                'transition-colors duration-200',
                className
            )}
        />
    )
}
