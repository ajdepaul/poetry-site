import { ButtonHTMLAttributes, FC, HTMLAttributes, ReactElement, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { architectsDaughter, cormorantGaramond } from '@/app/components/ui/fonts'

const headerVariants = cva(
  'mx-2',
  {
    variants: {
      variant: {
        default: `${cormorantGaramond.className}`,
        poem: `${architectsDaughter.className} text-graphite text-center leading-poem`
      },
      size: {
        '9xl': 'text-9xl',
        '8xl': 'text-8xl',
        '7xl': 'text-7xl',
        '6xl': 'text-6xl',
        '5xl': 'text-5xl',
        '4xl': 'text-4xl',
        '3xl': 'text-3xl',
        '2xl': 'text-2xl',
        'xl': 'text-xl',
        'lg': 'text-lg',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: '9xl'
    }
  }
)

interface HeaderProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headerVariants> {
  level: '1' | '2' | '3' | '4' | '5' | '6'
}

const H: FC<HeaderProps> = forwardRef<HTMLHeadingElement, HeaderProps>(({ level, className, variant, size, ...props }, ref) => {
  switch (level) {
    case '1': return <h1 ref={ref} className={twMerge(headerVariants({ variant, size, className }))} {...props} />
    case '2': return <h2 ref={ref} className={twMerge(headerVariants({ variant, size, className }))} {...props} />
    case '3': return <h3 ref={ref} className={twMerge(headerVariants({ variant, size, className }))} {...props} />
    case '4': return <h4 ref={ref} className={twMerge(headerVariants({ variant, size, className }))} {...props} />
    case '5': return <h5 ref={ref} className={twMerge(headerVariants({ variant, size, className }))} {...props} />
    case '6': return <h6 ref={ref} className={twMerge(headerVariants({ variant, size, className }))} {...props} />
  }
})

export { H, headerVariants }
