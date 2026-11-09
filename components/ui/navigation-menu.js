import { View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function NavigationMenu({ children, className, ...props }) {
  return (
    <View className={cn('relative flex flex-row items-center', className)} {...props}>
      {children}
    </View>
  );
}

export function NavigationMenuList({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-row items-center gap-1', className)} {...props}>
      {children}
    </View>
  );
}

export function NavigationMenuItem({ children, className, ...props }) {
  const [open, setOpen] = useState(false);

  return (
    <View className={cn('relative', className)} {...props}>
      {typeof children === 'function' ? children({ open, setOpen }) : children}
    </View>
  );
}

export function NavigationMenuTrigger({ open, setOpen, children, className, ...props }) {
  return (
    <Pressable
      onPress={() => setOpen(!open)}
      className={cn(
        'flex flex-row items-center gap-1 rounded-md px-3 py-2',
        'active:bg-slate-100',
        open && 'bg-slate-100',
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm font-medium text-slate-900">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export function NavigationMenuContent({ open, setOpen, children, className, ...props }) {
  if (!open) return null;

  return (
    <Pressable
      className="absolute inset-0 z-50"
      onPress={() => setOpen(false)}
    >
      <View
        className={cn(
          'absolute top-full left-0 mt-1 min-w-48 rounded-md border border-slate-200',
          'bg-white p-2 shadow-lg',
          className
        )}
        {...props}
      >
        <ScrollView>{children}</ScrollView>
      </View>
    </Pressable>
  );
}

export function NavigationMenuLink({ children, onPress, className, ...props }) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'block select-none rounded-md p-3 leading-none',
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
