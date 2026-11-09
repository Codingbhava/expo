import { cn } from '../../lib/utils';
import { View, Image, Text } from "react-native"
import * as React from "react"

const AvatarContext = React.createContext({
  imageLoaded: false,
  setImageLoaded: () => {},
})

function Avatar({
  className,
  children,
  ...props
}) {
  const [imageLoaded, setImageLoaded] = React.useState(false)

  return (
    <AvatarContext.Provider value={{ imageLoaded, setImageLoaded }}>
      <View
        className={cn(
          "relative flex size-8 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </View>
    </AvatarContext.Provider>
  )
}

function AvatarImage({
  className,
  source,
  src,
  alt,
  ...props
}) {
  const { setImageLoaded } = React.useContext(AvatarContext)
  
  const imageSource = source || (src ? { uri: src } : null)

  if (!imageSource) return null

  return (
    <Image
      source={imageSource}
      className={cn("aspect-square size-full", className)}
      onLoad={() => setImageLoaded(true)}
      onError={() => setImageLoaded(false)}
      accessible={!!alt}
      accessibilityLabel={alt}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  children,
  ...props
}) {
  const { imageLoaded } = React.useContext(AvatarContext)

  if (imageLoaded) return null

  return (
    <View
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
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

export { Avatar, AvatarImage, AvatarFallback }
