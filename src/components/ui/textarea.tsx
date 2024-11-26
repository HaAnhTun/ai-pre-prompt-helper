import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-lg border-2 border-purple-100/50 bg-white/70 px-4 py-3 text-base",
        "placeholder:text-gray-400 placeholder:text-sm",
        "shadow-sm backdrop-blur-sm transition-all duration-200",
        "hover:border-purple-200/70 hover:bg-white/90",
        "focus:border-purple-300 focus:bg-white focus:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-200/50 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:border-gray-800 dark:bg-gray-950/70 dark:text-gray-100",
        "dark:placeholder:text-gray-500",
        "dark:hover:border-gray-700 dark:hover:bg-gray-900/90",
        "dark:focus:border-purple-800 dark:focus:bg-gray-900 dark:focus:ring-purple-900/50",
        "md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
