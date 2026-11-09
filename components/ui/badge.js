import * as React from "react"
import { View, Text } from "react-native"
import { cn } from '../../lib/utils';

function Badge({
  className,
  variant = "default",
  children,
  ...props
}) {
  const variantStyles = {
    default: "border-transparent bg-primary",
    secondary: "border-transparent bg-secondary",
    destructive: "border-transparent bg-destructive",
    outline: "border-border bg-transparent",
  }

  const textVariantStyles = {
    default: "text-primary-foreground",
    secondary: "text-secondary-foreground",
    destructive: "text-white",
    outline: "text-foreground",
  }

  return (
    <View
      className={cn(
        "inline-flex flex-row items-center justify-center rounded-full border px-2 py-0.5 self-start",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className={cn("text-xs font-medium", textVariantStyles[variant])}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  )
}

export { Badge }
