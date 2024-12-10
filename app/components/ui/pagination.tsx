import { buttonVariants } from '@/app/components/ui/button'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { VariantProps, cva } from 'class-variance-authority'
import Link from 'next/link'
import { FC, HTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const paginationVariants = cva(
  'w-full max-w-screen-lg flex items-center justify-between p-4',
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

interface PaginationProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof paginationVariants> {
  prevHref?: string,
  nextHref?: string,
  isSearchParamRedirect?: boolean
}

const Pagination: FC<PaginationProps> = forwardRef<HTMLDivElement, PaginationProps>((
  {
    className,
    variant,
    prevHref,
    nextHref,
    isSearchParamRedirect = false,
    children,
    ...props },
  ref
) => {
  return (
    <div
      ref={ref}
      className={twMerge(paginationVariants
      ({ variant, className }))}
      {...props}
    >
      {/* prev button */}
      {prevHref !== undefined ? (
        isSearchParamRedirect ? (
          <a href={prevHref} className={twMerge(buttonVariants(), `rounded-full`)}>
            <ArrowLeftIcon className="size-5 fill-white" />
          </a>
        ) : (
          <Link href={prevHref} className={twMerge(buttonVariants(), `rounded-full`)}>
            <ArrowLeftIcon className="size-5 fill-white" />
          </Link>
        )
      ) : (<div className="size-10"></div>)}

      <div className="text-xl text-graphite">{children}</div>

      {/* next button */}
      {nextHref !== undefined ? (
        isSearchParamRedirect ? (
          <a href={nextHref} className={twMerge(buttonVariants(), `rounded-full`)}>
            <ArrowRightIcon className="size-5 fill-white" />
          </a>
        ) : (
          <Link href={nextHref} className={twMerge(buttonVariants(), `rounded-full`)}>
            <ArrowRightIcon className="size-5 fill-white" />
          </Link>
        )
      ) : (<div className="size-10" />)}
    </div >
  )
})

export { Pagination, paginationVariants

 }
