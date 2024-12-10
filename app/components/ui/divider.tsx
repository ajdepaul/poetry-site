import { HTMLAttributes, FC, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const dividerVariants = cva(
  'h-0',
  {
    variants: {
      variant: {
        solid: 'border-solid',
        dashed: 'border-dashed',
        dotted: 'border-dotted',
        double: 'border-double',
      },
      width: {
        'sm': 'w-16',
        'md': 'w-32',
        'lg': 'w-48',
        'xl': 'w-64',
      },
      thickness: {
        '1': 'border-b',
        '2': 'border-b-2',
        '3': 'border-b-3',
        '4': 'border-b-4',
      },
      lineColor: {
        'theme-green': 'border-theme-green',
        'theme-light-green': 'border-theme-light-green',
        'theme-white': 'border-theme-white',
        'theme-light-brown': 'border-theme-light-brown',
        'theme-brown': 'border-theme-brown',
      }
    },
    defaultVariants: {
      variant: 'solid',
      width: 'md',
      thickness: '1',
      lineColor: 'theme-brown',
    }
  }
)

interface DividerProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof dividerVariants> { }

const Divider: FC<DividerProps> = forwardRef<HTMLDivElement, DividerProps>(({ className, variant, width, thickness, lineColor, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(dividerVariants({ variant, width, thickness, lineColor, className }))}
      {...props}
    />
  )
})

export { Divider, dividerVariants }
