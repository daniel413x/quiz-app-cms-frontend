import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

// eslint-disable-next-line react/display-name
const DialogCloseButton = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>((_, ref) => (
  <DialogPrimitive.Close ref={ref} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
    <Cross2Icon className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </DialogPrimitive.Close>
));

export {
  DialogCloseButton,
};
