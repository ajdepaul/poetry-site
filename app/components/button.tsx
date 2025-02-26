'use client';

import buttonVariants from '@/app/components/cva/buttonVariants';
import { VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC } from 'react';
import { useFormStatus } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { }

const Button: FC<ButtonProps> = ({ className, bgColor, ...props }) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className={twMerge(buttonVariants({ bgColor, pending }), className)}
      {...props}
    />
  );
};

export { Button };

