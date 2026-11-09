import { View, Pressable, Text } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function Collapsible({ open: controlledOpen, onOpenChange, children, className, ...props }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const toggle = () => {
    const newValue = !isOpen;
    setInternalOpen(newValue);
    onOpenChange?.(newValue);
  };

  return (
    <View className={cn('', className)} {...props}>
      {typeof children === 'function' ? children({ isOpen, toggle }) : children}
    </View>
  );
}

export function CollapsibleTrigger({ children, toggle, className, ...props }) {
  return (
    <Pressable onPress={toggle} className={cn('', className)} {...props}>
      {children}
    </Pressable>
  );
}

export function CollapsibleContent({ isOpen, children, className, ...props }) {
  if (!isOpen) return null;

  return (
    <View className={cn('', className)} {...props}>
      {children}
    </View>
  );
}
