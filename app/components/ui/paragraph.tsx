import { architectsDaughter } from '@/app/components/ui/fonts'
import { VariantProps, cva } from 'class-variance-authority'
import { FC, HTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const paragraphVariants = cva(
  `${architectsDaughter.className} text-center text-nowrap text-graphite pb-12 leading-poem text-xl last:pb-6`,
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

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> { }

const P: FC<ParagraphProps> = forwardRef<HTMLDivElement, ParagraphProps>(({ className, variant, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={twMerge(paragraphVariants({ variant }), className)}
      {...props}
    />
  )
})

export { P, paragraphVariants }

