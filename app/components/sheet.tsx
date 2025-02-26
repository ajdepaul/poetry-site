import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const sheetVariants = cva(
  'sm:p-6 p-4 w-full shadow-xl rounded-lg bg-theme-white grow',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    }
  }
);

interface SheetProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof sheetVariants> {
};

const Sheet: FC<SheetProps> = forwardRef<HTMLDivElement, SheetProps>(({ className, variant, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(sheetVariants({ variant, className }))}
      {...props}
    >
      <div className="bg-grid size-full">
        {children}
      </div>
    </div>
  )
});

export { Sheet, sheetVariants };

