"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-y-2">
      <Button type="submit" aria-disabled={pending} {...props}>
        {pending ? pendingText : children}
      </Button>
      {pending &&
        <div className="gap-y-0">
          <h1 className="text-muted-foreground text-sm">
            Creating example projects and tasks... 
          </h1>
          <h1 className="text-muted-foreground text-sm">
            (...this may take a few seconds...)
          </h1>
        </div>
      }
    </div>
  );
}
