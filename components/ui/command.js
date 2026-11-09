import { View, TextInput, Text, ScrollView, Pressable } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function Command({ children, className, ...props }) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <View className={cn('flex flex-col rounded-lg border border-slate-200 bg-white', className)} {...props}>
      {typeof children === 'function' ? children({ value, setValue, open, setOpen }) : children}
    </View>
  );
}

export function CommandInput({ value, onValueChange, placeholder, className, ...props }) {
  return (
    <TextInput
      value={value}
      onChangeText={onValueChange}
      placeholder={placeholder}
      className={cn(
        'h-11 w-full border-b border-slate-200 bg-transparent px-3 text-sm',
        'placeholder:text-slate-500',
        className
      )}
      {...props}
    />
  );
}

export function CommandList({ children, className, ...props }) {
  return (
    <ScrollView className={cn('max-h-80 overflow-y-auto p-1', className)} {...props}>
      {children}
    </ScrollView>
  );
}

export function CommandEmpty({ children = 'No results found.', className, ...props }) {
  return (
    <View className={cn('py-6 text-center', className)} {...props}>
      <Text className="text-sm text-slate-500">{children}</Text>
    </View>
  );
}

export function CommandGroup({ heading, children, className, ...props }) {
  return (
    <View className={cn('overflow-hidden p-1', className)} {...props}>
      {heading && (
        <Text className="px-2 py-1.5 text-xs font-medium text-slate-500">{heading}</Text>
      )}
      {children}
    </View>
  );
}

export function CommandItem({ onSelect, children, className, ...props }) {
  return (
    <Pressable
      onPress={onSelect}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5',
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

export function CommandSeparator({ className, ...props }) {
  return <View className={cn('h-px bg-slate-200 my-1', className)} {...props} />;
}
