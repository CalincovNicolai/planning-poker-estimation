import clsx from 'clsx';
import type { ITruncatedTextWithTooltipModel } from '../../types/types.ts';

export default function TruncatedTextWithTooltip({ name, maxLength = 16, className }: ITruncatedTextWithTooltipModel) {
  const isTruncated = name.length > maxLength;
  const displayName = isTruncated ? name.slice(0, maxLength) + '…' : name;

  return (
    <span title={isTruncated ? name : undefined} className={clsx('truncate max-w-[10rem] inline-block', className)}>
      {displayName}
    </span>
  );
}
