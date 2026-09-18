import * as React from "react";

import { cn } from "@/lib/utils";

/** Base compartida por input, textarea y select, asi los tres miden igual. */
export const controlBase = [
  "w-full rounded-md border border-input bg-card text-foreground",
  "placeholder:text-muted-foreground/70",
  "transition-[border-color,box-shadow] duration-150",
  "hover:border-border-strong",
  "outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25",
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-input",
  "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20",
].join(" ");

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      className={cn(controlBase, "h-10 px-3 text-sm", className)}
      {...props}
    />
  );
}

export { Input };
