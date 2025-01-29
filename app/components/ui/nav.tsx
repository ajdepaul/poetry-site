import { buttonVariants } from '@/app/components/ui/button'
import { HomeIcon } from '@heroicons/react/24/solid'
import { VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'
import { FC, HTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

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
}

const Nav: FC<navProps> = forwardRef<HTMLDivElement, navProps>(({ className, variant, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(navVariants({ variant, className }))}
      {...props}
    >
      <Link href="/" className={twMerge(buttonVariants(), 'rounded-full')}>
        <HomeIcon className="size-5 fill-white" />
      </Link>
    </div>
  )
})

export { Nav, navVariants }

