import { architectsDaughter } from '@/app/components/fonts';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const inputLabelVariants = cva(
  `${architectsDaughter.className} text-graphite text-xl leading-poem flex`,
  {
    variants: {
      containerVariant: {
        horizontal: 'items-center',
        vertical: 'flex-col',
      },
    },
    defaultVariants: {
      containerVariant: 'horizontal',
    }
  }
);

const inputVariants = cva(
  'text-graphite text-xl px-2 py-0.5 rounded-lg shadow-md',
  {
    variants: {
      inputVariant: {
        default: `${architectsDaughter.className}`,
        monospace: 'font-mono',
      },
    },
    defaultVariants: {
      inputVariant: 'default',
    }
  }
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants>, VariantProps<typeof inputLabelVariants> {
  labelName: string,
  containerClassName?: string,
  textArea?: boolean
}

const Input: FC<InputProps> = ({
  labelName,
  className,
  containerClassName,
  inputVariant,
  containerVariant,
  placeholder,
  textArea = false,
  ...props
}) => {

  const inputProps = {
    className: twMerge(inputVariants({ inputVariant }), className),
    placeholder: placeholder || labelName,
    ...props
  }

  return (
    <label className={twMerge(inputLabelVariants({ containerVariant }), containerClassName)} >
      {labelName}:&nbsp;
      {
        textArea ? (
          <textarea
            placeholder={inputProps.placeholder}
            defaultValue={inputProps.defaultValue}
            className={inputProps.className}
            required={inputProps.required}
            name={inputProps.name}
          />
        ) : (
          <input {...inputProps} />
        )
      }
    </label>
  )
};

export { Input, inputLabelVariants, inputVariants };

