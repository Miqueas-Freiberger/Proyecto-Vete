import * as React from "react";

import { cn } from "@/lib/utils";
import { controlBase } from "./input";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(controlBase, "min-h-28 resize-y px-3 py-2.5 text-sm leading-relaxed", className)}
      {...props}
    />
  );
}

export { Textarea };
