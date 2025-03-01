import buttonVariants from '@/app/components/cva/buttonVariants';
import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { IoHome, IoLogOut } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';

const navVariants = cva(
  'absolute right-4 top-4 flex gap-4',
  {
    variants: {},
    defaultVariants: {}
  }
);

interface navProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof navVariants> {
  showAdminButton: boolean
}

const Nav: FC<navProps> = ({ showAdminButton, className, ...props }) => (
  <div className={twMerge(navVariants({ className }))} {...props}>
    <Link href="/" className={twMerge(buttonVariants(), 'rounded-full')}>
      <IoHome className="size-5 text-white" />
    </Link>
    {
      showAdminButton && (
        <>
          <Link href="/admin" className={twMerge(buttonVariants({ bgColor: 'dark-brown' }), 'rounded-full')}>
            <FaPencilAlt className="size-5 text-white" />
          </Link>
          <Link href="/api/auth/logout" className={twMerge(buttonVariants({ bgColor: 'dark-brown' }), 'rounded-full')}>
            <IoLogOut className="size-5 text-white" />
          </Link>
        </>
      )
    }
  </div >
);

export { Nav, navVariants };

