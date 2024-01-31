import { UilCheck, UilEye, UilEyeSlash, UilInfo } from '@/icons';
import { cn } from '@/utils';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

export const inputVariants = cva(
  `outline-offset-0 outline-none w-full focus:outline disabled:opacity-80 disabled:italic`,
  {
    variants: {
      variant: {
        default:
          'focus:outline-black-100/50 border-gray-500 text-blue-300 placeholder:font-700 bg-white placeholder:text-gray-300'
      },
      inputSize: {
        default: 'p-4 text-16 leading-5'
      },
      corner: {
        default: 'rounded-[16px]',
        'rounded-full': 'rounded-full'
      },
      border: {
        default: 'border-transparent'
      }
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
      corner: 'default',
      border: 'default'
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
  error?: string;
  isValid?: boolean;
}

const CustomInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, error, isValid, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    return (
      <>
        <div className="w-full relative">
          <input
            type={showPassword ? 'text' : type}
            className={cn(
              inputVariants({ variant, inputSize, className }),
              error &&
                'border border-solid border-danger-100 dark:border dark:border-solid dark: border-danger-100'
            )}
            ref={ref}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="me-5 absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer focus:outline-none"
            >
              {showPassword ? <UilEyeSlash /> : <UilEye />}
            </button>
          )}

          {!error && isValid && (
            <UilCheck className="bg-success-200 text-white w-5 h-5 p-[1px] rounded-full absolute top-1/2 -translate-y-1/2 right-5" />
          )}
          {error && (
            <UilInfo className="bg-danger-100 text-white w-5 h-5 p-[1px] rounded-full absolute top-1/2 -translate-y-1/2 right-5 " />
          )}
        </div>
        {error && (
          <p className="mt-2 ml-5 p-0 text-12 font-500 leading-[120%] text-danger-100">
            {error}
          </p>
        )}
      </>
    );
  }
);
CustomInput.displayName = 'CustomInput';

export { CustomInput };
