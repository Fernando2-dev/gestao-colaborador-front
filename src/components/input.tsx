import { ComponentProps } from "react"


interface InputPrefixProps extends ComponentProps<'div'> {}

export const InputPrefix = (props: InputPrefixProps) => {
    return <div {...props}></div>
}

interface InputControlProps extends ComponentProps<'input'> {}

export const InputControl = (props: InputControlProps) => {
    return <input
        className="flex-1 border-0 text-black bg-transparent placeholder:text-zinc-900 "
        {...props}
    />
}

interface InputRootProps extends ComponentProps<'div'>{}

export const InputRoot = (props: InputRootProps) => {
    return (
        <div 
        className="flex w-full items-center gap-2 rounded-lg border border-lg-zinc-300 px-3 py-2 shadow-sm"
        {...props}
        >
        </div>
    )
}