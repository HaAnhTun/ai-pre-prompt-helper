import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:translate-y-[-1px] hover:shadow-purple-500/25 active:translate-y-[1px]",
        destructive:
          "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg hover:translate-y-[-1px] hover:shadow-red-500/25 active:translate-y-[1px]",
        outline:
          "border-2 border-purple-200 bg-white text-purple-700 shadow-sm hover:bg-purple-50 hover:border-purple-300 dark:border-purple-800 dark:bg-gray-950 dark:text-purple-400 dark:hover:bg-gray-900",
        secondary:
          "bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg hover:translate-y-[-1px] hover:shadow-gray-500/25 active:translate-y-[1px] dark:from-gray-700 dark:to-gray-800",
        ghost: 
          "hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-gray-800 dark:hover:text-purple-400",
        link: 
          "text-purple-600 underline-offset-4 hover:text-purple-700 hover:underline dark:text-purple-400 dark:hover:text-purple-300",
        glass:
          "bg-white/80 backdrop-blur-sm border border-white/20 text-gray-900 shadow-lg hover:bg-white/90 dark:bg-gray-900/80 dark:text-white dark:hover:bg-gray-900/90",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-11 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
        xl: "h-12 rounded-xl px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
