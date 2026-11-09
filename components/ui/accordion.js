import * as React from "react"
import { View, Text, TouchableOpacity, Animated } from "react-native"
import { ChevronDown } from "lucide-react-native"
import { cn } from '../../lib/utils';

const AccordionContext = React.createContext({
  openItems: [],
  toggleItem: () => {},
  type: "single"
})

function Accordion({ 
  type = "single", 
  defaultValue,
  value,
  onValueChange,
  collapsible = false,
  className,
  children,
  ...props
}) {
  const [internalOpenItems, setInternalOpenItems] = React.useState(
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []
  )

  const openItems = value !== undefined 
    ? (Array.isArray(value) ? value : [value])
    : internalOpenItems

  const toggleItem = React.useCallback((itemValue) => {
    const newOpenItems = openItems.includes(itemValue)
      ? (collapsible || type === "multiple" ? openItems.filter(v => v !== itemValue) : openItems)
      : type === "single" 
        ? [itemValue] 
        : [...openItems, itemValue]

    if (value === undefined) {
      setInternalOpenItems(newOpenItems)
    }
    
    if (onValueChange) {
      onValueChange(type === "single" ? newOpenItems[0] : newOpenItems)
    }
  }, [openItems, type, collapsible, value, onValueChange])

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <View className={cn("", className)} {...props}>
        {children}
      </View>
    </AccordionContext.Provider>
  )
}

function AccordionItem({ 
  className,
  value,
  children,
  ...props
}) {
  const { openItems } = React.useContext(AccordionContext)
  const isOpen = openItems.includes(value)

  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <View
        className={cn("border-b border-border", className)}
        {...props}
      >
        {children}
      </View>
    </AccordionItemContext.Provider>
  )
}

const AccordionItemContext = React.createContext({ value: "", isOpen: false })

function AccordionTrigger({
  className,
  children,
  ...props
}) {
  const { toggleItem } = React.useContext(AccordionContext)
  const { value, isOpen } = React.useContext(AccordionItemContext)
  const rotateAnim = React.useRef(new Animated.Value(isOpen ? 1 : 0)).current

  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [isOpen, rotateAnim])

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  return (
    <TouchableOpacity
      onPress={() => toggleItem(value)}
      className={cn(
        "flex flex-row items-center justify-between gap-4 py-4",
        className
      )}
      activeOpacity={0.7}
      {...props}
    >
      <View className="flex-1">
        {typeof children === 'string' ? (
          <Text className="text-sm font-medium">{children}</Text>
        ) : (
          children
        )}
      </View>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <ChevronDown size={16} className="text-muted-foreground" />
      </Animated.View>
    </TouchableOpacity>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}) {
  const { isOpen } = React.useContext(AccordionItemContext)
  const [contentHeight, setContentHeight] = React.useState(0)
  const heightAnim = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [isOpen, heightAnim])

  const animatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  })

  return (
    <Animated.View
      style={{ height: contentHeight > 0 ? animatedHeight : undefined, overflow: 'hidden' }}
    >
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout
          if (height > 0 && contentHeight !== height) {
            setContentHeight(height)
          }
        }}
        className={cn("pb-4", className)}
        {...props}
      >
        {children}
      </View>
    </Animated.View>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
