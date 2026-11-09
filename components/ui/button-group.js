import * as React from "react"
import { View, Text } from "react-native"
import { cn } from '../../lib/utils';
import { Separator } from "./separator"

function ButtonGroup({
  className,
  orientation = "horizontal",
  children,
  ...props
}) {
  const orientationStyles = {
    horizontal: "flex-row",
    vertical: "flex-col",
  }

  return (
    <View
      className={cn(
        "flex items-stretch self-start",
        orientationStyles[orientation],
        className
      )}
      accessibilityRole="group"
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        
        const isFirst = index === 0
        const isLast = index === React.Children.count(children) - 1
        
        const roundingClasses = orientation === "horizontal"
          ? cn(
              !isFirst && "rounded-l-none border-l-0",
              !isLast && "rounded-r-none"
            )
          : cn(
              !isFirst && "rounded-t-none border-t-0",
              !isLast && "rounded-b-none"
            )
        
        return React.cloneElement(child, {
          className: cn(child.props.className, roundingClasses),
        })
      })}
    </View>
  )
}

function ButtonGroupText({
  className,
  children,
  ...props
}) {
  return (
    <View
      className={cn(
        "bg-muted flex flex-row items-center gap-2 rounded-md border border-border px-4 py-2",
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm font-medium">{children}</Text>
      ) : (
        children
      )}
    </View>
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}) {
  return (
    <Separator
      orientation={orientation}
      className={cn(
        "bg-input m-0",
        orientation === "vertical" ? "h-full" : "w-full",
        className
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
}
