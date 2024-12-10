import { HTMLAttributes, FC, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { Bars4Icon, HomeIcon } from '@heroicons/react/24/solid'
import { buttonVariants } from '@/app/components/ui/button'

const navVariants = cva(
  'absolute right-4 top-4 flex gap-4',
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
)

interface navProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof navVariants> {
  isAtHome: boolean,
  isAdmin: boolean,
  isAtAdminHome: boolean,
}

const Nav: FC<navProps> = forwardRef<HTMLDivElement, navProps>(({ className, variant, isAtHome, isAdmin, isAtAdminHome, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(navVariants({ variant, className }))}
      {...props}
    >
      {!isAtAdminHome ? (
        <Link href={`/admin`} className={twMerge(buttonVariants({ bgColor: 'dark-brown' }), 'rounded-full')}>
          <Bars4Icon className="size-5 fill-white" />
        </Link>
      ) : (
        <div className={twMerge(buttonVariants({ bgColor: 'brown' }), 'rounded-full hover:bg-theme-brown hover:border-theme-brown active:scale-100')}>
          <Bars4Icon className="size-5 fill-white" />
        </div>
      )}

      {!isAtHome ? (
        <Link href="/" className={twMerge(buttonVariants(), 'rounded-full')}>
          <HomeIcon className="size-5 fill-white" />
        </Link>
      ) : (
        <div className={twMerge(buttonVariants({ bgColor: 'green' }), 'rounded-full hover:bg-theme-green hover:border-theme-bg-green active:scale-100')}>
          <HomeIcon className="size-5 fill-white" />
        </div>
      )}
    </div>
  )
})

export { Nav, navVariants }
