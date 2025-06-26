import { motion } from 'framer-motion';
import type { IFadeRouteWrapperModel } from '../../types/types.ts';

export default function FadeRouteWrapper({ children }: IFadeRouteWrapperModel) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
