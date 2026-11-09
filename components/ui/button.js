import * as React from "react"
import { Text, Pressable } from "react-native"
import { cn } from '../../lib/utils';

function Button({
  children,
  variant = "default",
  size = "default",
  className,
  textClassName,
  onPress,
  disabled,
  ...props
}) {
  const variantStyles = {
    default: "bg-primary active:bg-primary/90",
    destructive: "bg-destructive active:bg-destructive/90",
    outline: "border border-border bg-background active:bg-accent",
    secondary: "bg-secondary active:bg-secondary/80",
    ghost: "bg-transparent active:bg-accent",
    link: "bg-transparent",
  }

  const sizeStyles = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5",
    lg: "px-6 py-2.5",
    icon: "h-9 w-9",
    "icon-sm": "h-8 w-8",
    "icon-lg": "h-10 w-10",
  }

  const textVariantStyles = {
    default: "text-primary-foreground",
    destructive: "text-white",
    outline: "text-foreground",
    secondary: "text-secondary-foreground",
    ghost: "text-foreground",
    link: "text-primary underline",
  }

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn(
        "flex flex-row items-center justify-center gap-2 rounded-md",
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          className={cn(
            "font-medium text-center",
            textVariantStyles[variant],
            textClassName
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  )
}

export { Button }
