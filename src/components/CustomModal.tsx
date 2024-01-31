'use client';

import { cn } from '@/utils';
import { useEffect } from 'react';
import {
  CustomDialogContent,
  CustomDialogContentWithoutClose,
  Dialog,
  DialogTrigger
} from './UI/Dialog';

interface CustomModalProps {
  open: boolean;
  onOpenChange: any;
  withoutClose?: boolean;
  children: any;
  className?: string;
}
const CustomModal = ({
  open,
  onOpenChange,
  withoutClose,
  children,
  className
}: CustomModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.classList.add('!m-0');
      document.body.classList.add('!overflow-y-auto');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger />

      {withoutClose ? (
        <CustomDialogContentWithoutClose
          className={cn(
            'max-w-[656px] translate-y-0 md:translate-y-[-50%] rounded-[24px] data-[state=closed]:slide-out-to-top-[100%] data-[state=open]:slide-in-from-bottom-[100%] md:top-[50%] md:bottom-auto bottom-0 max-h-[calc(100vh-150px)] overflow-auto dialog-scrollbar',
            className
          )}
        >
          {children}
        </CustomDialogContentWithoutClose>
      ) : (
        <CustomDialogContent
          className={cn(
            'max-w-[656px] translate-y-0 md:translate-y-[-50%] rounded-[24px] data-[state=closed]:slide-out-to-top-[100%] data-[state=open]:slide-in-from-bottom-[100%] md:top-[50%] md:bottom-auto bottom-0 max-h-[calc(100vh-150px)] overflow-auto dialog-scrollbar',
            className
          )}
        >
          {children}
        </CustomDialogContent>
      )}
    </Dialog>
  );
};

export default CustomModal;
