import {AnimatePresence, motion} from 'framer-motion';
import type {IInlineAlertModel} from '../../types/types';
import clsx from "clsx";
import {variantStyles} from "../constants/constants.ts";

export default function InlineAlert(
    {
        icon,
        children,
        variant = 'info',
        show = true,
        className = '',
    }: IInlineAlertModel) {
    return (
        <AnimatePresence mode="wait" initial={false}>
            {show && (
                <motion.div
                    key="inline-alert"
                    initial={{opacity: 0, y: 6}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 6}}
                    transition={{duration: 0.3, ease: 'easeOut'}}
                    className={clsx(
                        'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow-sm',
                        variantStyles[variant],
                        className
                    )}
                >
                    {icon && <div className="text-xl">{icon}</div>}
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

