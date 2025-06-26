import { FiClock } from 'react-icons/fi';
import type { ITimerDisplayModel } from '../../types/types.ts';
import IconWrapper from '../primitives/IconWrapper.tsx';
import { motion } from 'framer-motion';

export default function TimerDisplay({ seconds }: ITimerDisplayModel) {
  const isFinalSeconds = seconds <= 10 && seconds > 0;

  return (
    <motion.div
      className="flex gap-2 items-center font-mono"
      animate={isFinalSeconds ? { scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] } : {}}
      transition={isFinalSeconds ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <div className="flex text-lg items-center">
        <IconWrapper icon={<FiClock />} />
      </div>
      <div className="flex gap-1 text-md items-center">
        Time left: <span className="text-md font-semibold">{seconds}s</span>️
      </div>
    </motion.div>
  );
}
