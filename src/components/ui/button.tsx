import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-bold uppercase tracking-wider ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_22px_hsl(var(--primary)/0.45)]",
        blood: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_28px_hsl(var(--primary)/0.55)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-iron/40 bg-transparent text-iron hover:border-iron hover:bg-iron/5",
        bloodOutline: "border border-primary/60 bg-transparent text-primary hover:bg-primary/10 hover:border-primary",
        gold: "bg-gold text-gold-foreground hover:bg-gold/90 hover:shadow-[0_0_24px_hsl(var(--gold)/0.45)]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-hair",
        ghost: "hover:bg-accent/40 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline tracking-normal normal-case font-medium",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
