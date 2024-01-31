"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  createContext,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Portal } from "./Portal";

interface SlideModalProps {
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
}

export type SlideModalHandle = {
  open: () => void;
  close: () => void;
};

export const SlideModalContext = createContext<SlideModalHandle | null>(null);

export const SlideModal = forwardRef<SlideModalHandle, SlideModalProps>(
  ({ children, className, childrenClassName }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
      setIsOpen(true);
    };
    const close = () => {
      setIsOpen(false);
    };

    useImperativeHandle(ref, () => {
      return {
        open,
        close,
      };
    });

    useEffect(() => {
      if (isOpen) {
        document.body.classList.add("!overflow-hidden");
      } else {
        document.body.classList.remove("!overflow-hidden");
      }
    }, [isOpen]);

    return (
      <Portal>
        <SlideModalContext.Provider value={{ open, close }}>
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.2, type: "spring", bounce: 0.1 }}
                  className={`fixed z-50 w-full max-w-[656px] top-0 bottom-0 right-0 p-3 ${className}`}
                >
                  <div
                    className={`w-full rounded-[32px] sm:rounded-[48px] h-full bg-white p-4 shadow-md ${childrenClassName}`}
                  >
                    {children}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ backdropFilter: "blur(0px)" }}
                  animate={{ backdropFilter: "blur(20px)" }}
                  exit={{ backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.1 }}
                  className="bg-gray-400/50 fixed inset-0 z-40 block overflow-auto cursor-pointer transition-all"
                  onClick={() => setIsOpen(false)}
                ></motion.div>
              </>
            )}
          </AnimatePresence>
        </SlideModalContext.Provider>
      </Portal>
    );
  }
);

SlideModal.displayName = "SlideModal";

export default SlideModal;
