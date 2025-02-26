import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { AnchorHTMLAttributes, FC } from 'react';
import { twMerge } from 'tailwind-merge';

const anchorVariants = cva(
  '',
  {
    variants: {
      variant: {
        underline: 'hover:underline',
        'no-underline': ''
      },
    },
    defaultVariants: {
      variant: 'underline',
    }
  }
);

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof anchorVariants> { }

const A: FC<AnchorProps> = ({ className, href, variant, ...props }) => (
  <Link
    href={String(href)}
    className={twMerge(anchorVariants({ variant, className }))}
    {...props}
  />
);

export { A, anchorVariants };

