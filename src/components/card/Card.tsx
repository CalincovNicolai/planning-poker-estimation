import type { ICardModel } from '../../types/types.ts';
import { motion } from 'framer-motion';
import Button from '../primitives/Button.tsx';
import { renderVoteValue } from '../../utils/renderVoteValue.tsx';

export default function Card({
  value,
  onClick,
  disabled,
  readOnly = false,
  cardWrapperClassName = 'w-16 h-20',
}: ICardModel) {
  return (
    <motion.div
      className={cardWrapperClassName}
      whileTap={{ scale: 0.95 }}
      whileHover={!disabled && !readOnly ? { scale: 1.15 } : {}}
    >
      <Button
        onClick={onClick}
        disabled={disabled || readOnly}
        className={`flex items-center justify-center text-zinc-800 w-full h-full text-xl lg:text-2xl font-bold border border-zinc-700 dark:border-zinc-200 rounded shadow-lg transition-transform duration-300 ${
          readOnly ? 'bg-zinc-200 dark:bg-zinc-300' : disabled ? 'bg-gray-200' : 'bg-green-200 hover:bg-blue-300'
        } ${readOnly ? 'cursor-default' : disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {renderVoteValue(value)}
      </Button>
    </motion.div>
  );
}
