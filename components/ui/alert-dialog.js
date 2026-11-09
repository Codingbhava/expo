import * as React from "react"
import { View, Text, Modal, TouchableOpacity, Pressable, Animated } from "react-native"
import { cn } from '../../lib/utils';
import { Button } from "./button"

const AlertDialogContext = React.createContext({
  open: false,
  setOpen: () => {},
})

function AlertDialog({ 
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  children,
  ...props
}) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  
  const setOpen = React.useCallback((value) => {
    if (controlledOpen === undefined) {
      setInternalOpen(value)
    }
    onOpenChange?.(value)
  }, [controlledOpen, onOpenChange])

  return (
    <AlertDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

function AlertDialogTrigger({ 
  children,
  asChild,
  ...props
}) {
  const { setOpen } = React.useContext(AlertDialogContext)
  
  if (asChild) {
    return React.cloneElement(children, {
      onPress: () => setOpen(true)
    })
  }

  return (
    <TouchableOpacity onPress={() => setOpen(true)} {...props}>
      {children}
    </TouchableOpacity>
  )
}

function AlertDialogPortal({ children }) {
  return <>{children}</>
}

function AlertDialogOverlay({
  className,
  ...props
}) {
  const { setOpen } = React.useContext(AlertDialogContext)
  const fadeAnim = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
      }}
    >
      <Pressable
        className={cn("absolute inset-0 bg-black/50", className)}
        onPress={() => setOpen(false)}
        {...props}
      />
    </Animated.View>
  )
}

function AlertDialogContent({
  className,
  children,
  ...props
}) {
  const { open, setOpen } = React.useContext(AlertDialogContext)
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current
  const fadeAnim = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [open])

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => setOpen(false)}
    >
      <View className="flex-1 items-center justify-center px-4">
        <AlertDialogOverlay />
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim,
          }}
          className={cn(
            "bg-background w-full max-w-lg rounded-lg border border-border p-6 shadow-lg",
            className
          )}
          {...props}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  )
}

function AlertDialogHeader({
  className,
  children,
  ...props
}) {
  return (
    <View
      className={cn("flex flex-col gap-2 text-center", className)}
      {...props}
    >
      {children}
    </View>
  )
}

function AlertDialogFooter({
  className,
  children,
  ...props
}) {
  return (
    <View
      className={cn("flex flex-col-reverse gap-2 mt-4", className)}
      {...props}
    >
      {children}
    </View>
  )
}

function AlertDialogTitle({
  className,
  children,
  ...props
}) {
  return (
    <Text
      className={cn("text-lg font-semibold", className)}
      {...props}
    >
      {children}
    </Text>
  )
}

function AlertDialogDescription({
  className,
  children,
  ...props
}) {
  return (
    <Text
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    >
      {children}
    </Text>
  )
}

function AlertDialogAction({
  className,
  children,
  onPress,
  ...props
}) {
  const { setOpen } = React.useContext(AlertDialogContext)
  
  const handlePress = () => {
    onPress?.()
    setOpen(false)
  }

  return (
    <Button
      className={cn("", className)}
      onPress={handlePress}
      {...props}
    >
      {children}
    </Button>
  )
}

function AlertDialogCancel({
  className,
  children,
  onPress,
  ...props
}) {
  const { setOpen } = React.useContext(AlertDialogContext)
  
  const handlePress = () => {
    onPress?.()
    setOpen(false)
  }

  return (
    <Button
      variant="outline"
      className={cn("", className)}
      onPress={handlePress}
      {...props}
    >
      {children}
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
