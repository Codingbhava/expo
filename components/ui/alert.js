import * as React from "react"
import { View, Text } from "react-native"
import { cn } from '../../lib/utils';

function Alert({
  className,
  variant = "default",
  children,
  ...props
}) {
  const variantStyles = {
    default: "bg-card border-border",
    destructive: "bg-card border-destructive",
  }

  return (
    <View
      className={cn(
        "relative w-full rounded-lg border px-4 py-3",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <View className="flex-row items-start gap-3">
        {children}
      </View>
    </View>
  )
}

function AlertTitle({ 
  className, 
  children,
  ...props 
}) {
  return (
    <Text
      className={cn(
        "font-semibold tracking-tight text-base",
        className
      )}
      {...props}
    >
      {children}
    </Text>
  )
}

function AlertDescription({
  className,
  children,
  ...props
}) {
  return (
    <Text
      className={cn(
        "text-muted-foreground text-sm leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </Text>
  )
}

export { Alert, AlertTitle, AlertDescription }
