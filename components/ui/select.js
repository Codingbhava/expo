import { View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function Select({ value, onValueChange, placeholder, children, className, ...props }) {
  const [open, setOpen] = useState(false);

  return (
    <View className={cn('relative', className)} {...props}>
      {typeof children === 'function'
        ? children({ value, onValueChange, open, setOpen, placeholder })
        : children}
    </View>
  );
}

export function SelectTrigger({ value, placeholder, open, setOpen, className, ...props }) {
  return (
    <Pressable
      onPress={() => setOpen(!open)}
      className={cn(
        'flex flex-row items-center justify-between h-10 w-full rounded-md border border-slate-300',
        'bg-white px-3 py-2 text-sm',
        className
      )}
      {...props}
    >
      <Text className={cn('text-sm', !value && 'text-slate-500')}>
        {value || placeholder}
      </Text>
      <Text className="text-slate-500">▼</Text>
    </Pressable>
  );
}

export function SelectContent({ open, setOpen, children, className, ...props }) {
  if (!open) return null;

  return (
    <View
      className={cn(
        'absolute top-full left-0 right-0 z-50 mt-1 max-h-60',
        'rounded-md border border-slate-200 bg-white shadow-lg',
        className
      )}
      {...props}
    >
      <ScrollView className="p-1">{children}</ScrollView>
    </View>
  );
}

export function SelectItem({ value, onValueChange, setOpen, children, className, ...props }) {
  return (
    <Pressable
      onPress={() => {
        onValueChange(value);
        setOpen(false);
      }}
      className={cn(
        'relative flex w-full select-none items-center rounded-sm py-1.5 px-2',
        'active:bg-slate-100',
        className
      )}
      {...props}
    >
      <Text className="text-sm text-slate-900">{children}</Text>
    </Pressable>
  );
}

export function SelectValue({ value, placeholder }) {
  return <Text className="text-sm">{value || placeholder}</Text>;
}
