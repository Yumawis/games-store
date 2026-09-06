import type { ComponentPropsWithRef } from 'react'
import { cn } from '@/lib/utils'

export interface LabelProps extends ComponentPropsWithRef<'label'> {}

const Label = ({ className, ref, ...props }: LabelProps) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: shadcn Label receives htmlFor via props
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
