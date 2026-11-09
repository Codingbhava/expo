import { View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function ContextMenu({ children }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return typeof children === 'function' 
    ? children({ open, setOpen, position, setPosition }) 
    : children;
}

export function ContextMenuTrigger({ children, setOpen, setPosition, ...props }) {
  const handleLongPress = (e) => {
    setPosition({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
    setOpen(true);
  };

  return (
    <Pressable onLongPress={handleLongPress} {...props}>
      {children}
    </Pressable>
  );
}

export function ContextMenuContent({ open, setOpen, position, children, className, ...props }) {
  if (!open) return null;

  return (
    <Pressable
      className="absolute inset-0 z-50"
      onPress={() => setOpen(false)}
    >
      <View
        style={{ top: position.y, left: position.x }}
        className={cn(
          'absolute min-w-48 rounded-md border border-slate-200 bg-white p-1 shadow-lg',
          className
        )}
        {...props}
      >
        <ScrollView>{children}</ScrollView>
      </View>
    </Pressable>
  );
}

export function ContextMenuItem({ onSelect, setOpen, children, className, ...props }) {
  const handlePress = () => {
    onSelect?.();
    setOpen?.(false);
  };

  return (
    <Pressable
      onPress={handlePress}
      className={cn(
        'relative flex flex-row items-center rounded-sm px-2 py-1.5',
        'active:bg-slate-100',
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm text-slate-900">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export function ContextMenuSeparator({ className, ...props }) {
  return <View className={cn('h-px bg-slate-200 my-1', className)} {...props} />;
}
