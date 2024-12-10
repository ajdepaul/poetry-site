import { AnchorHTMLAttributes, ButtonHTMLAttributes, FC, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

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
)

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof anchorVariants> { }

const A: FC<AnchorProps> = forwardRef<HTMLAnchorElement, AnchorProps>(({ className, href, variant, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      href={String(href)}
      className={twMerge(anchorVariants({ variant, className }))}
      {...props}
    />
  )
})

export { A, anchorVariants }
