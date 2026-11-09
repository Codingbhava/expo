import { View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);

  return typeof children === 'function' ? children({ open, setOpen }) : children;
}

export function DropdownMenuTrigger({ children, setOpen, open, ...props }) {
  return (
    <Pressable onPress={() => setOpen(!open)} {...props}>
      {children}
    </Pressable>
  );
}

export function DropdownMenuContent({ open, setOpen, children, className, ...props }) {
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

export function DropdownMenuItem({ onSelect, setOpen, children, className, ...props }) {
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

export function DropdownMenuSeparator({ className, ...props }) {
  return <View className={cn('h-px bg-slate-200 my-1', className)} {...props} />;
}

export function DropdownMenuLabel({ children, className, ...props }) {
  return (
    <View className={cn('px-2 py-1.5', className)} {...props}>
      <Text className="text-xs font-semibold text-slate-500">{children}</Text>
    </View>
  );
}

export function DropdownMenuGroup({ children, className, ...props }) {
  return (
    <View className={cn('', className)} {...props}>
      {children}
    </View>
  );
}

export function DropdownMenuCheckboxItem({ checked, onCheckedChange, children, className, ...props }) {
  return (
    <Pressable
      onPress={() => onCheckedChange?.(!checked)}
      className={cn(
        'relative flex flex-row items-center rounded-sm px-2 py-1.5',
        'active:bg-slate-100',
        className
      )}
      {...props}
    >
      <View className="mr-2">
        {checked && <Text className="text-sm">✓</Text>}
      </View>
      {typeof children === 'string' ? (
        <Text className="text-sm text-slate-900">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export function DropdownMenuRadioGroup({ value, onValueChange, children, className, ...props }) {
  return (
    <View className={cn('', className)} {...props}>
      {typeof children === 'function' ? children({ value, onValueChange }) : children}
    </View>
  );
}

export function DropdownMenuRadioItem({ value, currentValue, onValueChange, children, className, ...props }) {
  const isSelected = value === currentValue;

  return (
    <Pressable
      onPress={() => onValueChange?.(value)}
      className={cn(
        'relative flex flex-row items-center rounded-sm px-2 py-1.5',
        'active:bg-slate-100',
        className
      )}
      {...props}
    >
      <View className="mr-2">
        {isSelected && <Text className="text-sm">●</Text>}
      </View>
      {typeof children === 'string' ? (
        <Text className="text-sm text-slate-900">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
