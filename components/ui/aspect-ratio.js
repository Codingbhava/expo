import * as React from "react"
import { View } from "react-native"
import { cn } from '../../lib/utils';

function AspectRatio({
  ratio = 1,
  className,
  style,
  children,
  ...props
}) {
  return (
    <View 
      className={cn("relative w-full", className)}
      style={[{ aspectRatio: ratio }, style]}
      {...props}
    >
      {children}
    </View>
  )
}

export { AspectRatio }
