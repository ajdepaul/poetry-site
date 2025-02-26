import { architectsDaughter } from '@/app/components/fonts'
import { VariantProps, cva } from 'class-variance-authority'
import { FC, HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

const paragraphVariants = cva(
  `${architectsDaughter.className} text-center text-nowrap text-graphite pb-12 leading-poem text-xl last:pb-6`,
  {
    variants: {},
    defaultVariants: {}
  }
)

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> { }

const P: FC<ParagraphProps> = ({ className, ...props }) => (
  <p className={twMerge(paragraphVariants({}), className)} {...props} />
);

export { P, paragraphVariants }

