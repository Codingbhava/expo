import { View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function Menubar({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-row items-center gap-1 rounded-md border border-slate-200 bg-white p-1', className)} {...props}>
      {children}
    </View>
  );
}

export function MenubarMenu({ children }) {
  const [open, setOpen] = useState(false);

  return typeof children === 'function' ? children({ open, setOpen }) : children;
}

export function MenubarTrigger({ open, setOpen, children, className, ...props }) {
  return (
    <Pressable
      onPress={() => setOpen(!open)}
      className={cn(
        'flex flex-row items-center rounded-sm px-3 py-1.5',
        'active:bg-slate-100',
        open && 'bg-slate-100',
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

export function MenubarContent({ open, setOpen, children, className, ...props }) {
  if (!open) return null;

  return (
    <Pressable
      className="absolute inset-0 z-50"
      onPress={() => setOpen(false)}
    >
      <View
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

export function MenubarItem({ onSelect, setOpen, children, className, ...props }) {
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

export function MenubarSeparator({ className, ...props }) {
  return <View className={cn('h-px bg-slate-200 my-1', className)} {...props} />;
}
