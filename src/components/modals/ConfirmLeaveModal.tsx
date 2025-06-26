import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ConfirmDialogVariant, IConfirmDialogModel } from '../../types/types.ts';
import Button from '../primitives/Button.tsx';
import { CONFIRM_DIALOG, confirmDialogVariantStyles } from '../constants/constants.ts';
import clsx from 'clsx';

interface ConfirmLeaveModalProps extends IConfirmDialogModel {
  variant?: ConfirmDialogVariant;
}

export default function ConfirmLeaveModal({ open, onCancel, onConfirm, variant = 'default' }: ConfirmLeaveModalProps) {
  const styles = confirmDialogVariantStyles[variant];

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onClose={onCancel} className="relative z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30"
          />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel
              className={`w-full max-w-md transform overflow-hidden rounded-xl p-6 text-left align-middle shadow-xl transition-all ${styles.panel}`}
            >
              <DialogTitle className="text-lg font-medium text-zinc-800 dark:text-white">
                {CONFIRM_DIALOG.TITLE('Are you sure you want to leave the room?')}
              </DialogTitle>
              <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
                {CONFIRM_DIALOG.MESSAGE('If you leave, your vote and presence in the room will be removed.')}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  onClick={onCancel}
                  className="flex items-center justify-center w-28 h-10 p-3 font-medium text-sm rounded-xl cursor-pointer bg-zinc-200 dark:bg-zinc-600 text-zinc-800 dark:text-white"
                >
                  {CONFIRM_DIALOG.CANCEL_TEXT('Cancel')}
                </Button>
                <Button
                  onClick={onConfirm}
                  className={clsx(
                    'flex items-center justify-center w-28 h-10 p-3 font-medium text-sm rounded-xl cursor-pointer',
                    styles.confirm
                  )}
                >
                  {CONFIRM_DIALOG.CONFIRM_TEXT('Leave Room')}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
