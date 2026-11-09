import * as React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { ChevronRight, MoreHorizontal } from "lucide-react-native"
import { cn } from '../../lib/utils';

function Breadcrumb({ className, children, ...props }) {
  return (
    <View 
      className={className}
      accessible={true}
      accessibilityRole="menu"
      accessibilityLabel="breadcrumb"
      {...props}
    >
      {children}
    </View>
  )
}

function BreadcrumbList({ className, children, ...props }) {
  return (
    <View
      className={cn(
        "flex flex-row flex-wrap items-center gap-1.5",
        className
      )}
      {...props}
    >
      {children}
    </View>
  )
}

function BreadcrumbItem({ className, children, ...props }) {
  return (
    <View
      className={cn("inline-flex flex-row items-center gap-1.5", className)}
      {...props}
    >
      {children}
    </View>
  )
}

function BreadcrumbLink({
  className,
  children,
  onPress,
  ...props
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn("", className)}
      activeOpacity={0.7}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-muted-foreground text-sm">{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

function BreadcrumbPage({ className, children, ...props }) {
  return (
    <View {...props}>
      {typeof children === 'string' ? (
        <Text 
          className={cn("text-foreground text-sm font-normal", className)}
          accessibilityRole="text"
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return (
    <View
      className={cn("", className)}
      accessibilityElementsHidden={true}
      importantForAccessibility="no"
      {...props}
    >
      {children ?? <ChevronRight size={14} className="text-muted-foreground" />}
    </View>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return (
    <View
      className={cn("flex size-9 items-center justify-center", className)}
      accessibilityElementsHidden={true}
      importantForAccessibility="no"
      {...props}
    >
      <MoreHorizontal size={16} className="text-muted-foreground" />
    </View>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
