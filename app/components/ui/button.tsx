import { ButtonHTMLAttributes, FC, forwardRef } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

const buttonVariants = cva(
  'p-2 rounded active:scale-95 shadow-md text-center border-2',
  {
    variants: {
      bgColor: {
        'green': 'bg-theme-green border-theme-green hover:bg-theme-light-green hover:border-theme-light-green',
        'dark-green': 'bg-theme-dark-green border-theme-dark-green hover:bg-theme-green hover:border-theme-green',
        'brown': 'bg-theme-brown border-theme-brown hover:bg-theme-light-brown hover:border-theme-light-brown',
        'dark-brown': 'bg-theme-dark-brown border-theme-dark-brown hover:bg-theme-brown hover:border-theme-brown',
      },
    },
    defaultVariants: {
      bgColor: 'dark-green',
    }
  }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { }

const Button: FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>(({ className, bgColor, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={twMerge(buttonVariants({ bgColor, className }))}
      {...props}
    />
  )
})

export { Button, buttonVariants }
