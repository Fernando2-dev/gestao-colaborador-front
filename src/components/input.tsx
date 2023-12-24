import React, { ComponentProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputLabelProps extends ComponentProps<'label'> { }
const InputLabel = forwardRef<HTMLLabelElement, InputLabelProps>(({ className, ...props }, ref) => {
  return <label
    {...props}
    className={
      cn("text-sm ml-1",
        className)
    }
    ref={ref} />;
});

InputLabel.displayName = 'InputLabel';


interface InputPrefixProps extends ComponentProps<'div'> { }
const InputPrefix = forwardRef<HTMLDivElement, InputPrefixProps>(({ className, ...props }, ref) => {
  return <div {...props} ref={ref} className={cn(className)} />;
});

InputPrefix.displayName = 'InputPrefix';


interface InputControlProps extends ComponentProps<'input'> { }
const InputControl = forwardRef<HTMLInputElement, InputControlProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={
        cn("flex-1 border-0 text-black bg-transparent placeholder:text-zinc-900 focus:outline-none",
          className)}
      {...props}
      ref={ref}
    />
  );
});

InputControl.displayName = 'InputControl';


interface InputRootInsideProps extends ComponentProps<'div'> { }
const InputRootInside = forwardRef<HTMLDivElement, InputRootInsideProps>(({ className, ...props }, ref) => {
  return (
    <div
      className={
        cn("flex w-full items-center gap-2 rounded-lg border border-lg-zinc-300 px-3 py-3 shadow-sm",
          className)}
      {...props}
      ref={ref}
    />
  )
})

InputRootInside.displayName = 'InputRootInside';


interface InputRootProps extends ComponentProps<'div'> { }
const InputRoot = forwardRef<HTMLDivElement, InputRootProps>(({className, ...props}, ref) => {
  return (
    <div
      className={
        cn("flex flex-col gap-2 px-4 w-full",
      className)}
      {...props}
      ref={ref}
    />
  )
})

InputRoot.displayName = 'InputRoot';

export { InputLabel, InputPrefix, InputControl, InputRootInside, InputRoot };