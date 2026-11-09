import { View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function Sidebar({ children, defaultOpen = true, className, ...props }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View className={cn('flex flex-row h-full', className)} {...props}>
      {typeof children === 'function' ? children({ open, setOpen }) : children}
    </View>
  );
}

export function SidebarProvider({ children }) {
  return <>{children}</>;
}

export function SidebarTrigger({ setOpen, open, className, ...props }) {
  return (
    <Pressable
      onPress={() => setOpen?.(!open)}
      className={cn('p-2', className)}
      {...props}
    >
      <Text className="text-slate-900">☰</Text>
    </Pressable>
  );
}

export function SidebarContent({ open, children, className, ...props }) {
  if (!open) return null;

  return (
    <ScrollView
      className={cn(
        'w-64 border-r border-slate-200 bg-white p-4',
        className
      )}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

export function SidebarHeader({ children, className, ...props }) {
  return (
    <View className={cn('mb-4', className)} {...props}>
      {children}
    </View>
  );
}

export function SidebarFooter({ children, className, ...props }) {
  return (
    <View className={cn('mt-auto pt-4', className)} {...props}>
      {children}
    </View>
  );
}

export function SidebarMenu({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-col gap-1', className)} {...props}>
      {children}
    </View>
  );
}

export function SidebarMenuItem({ children, className, ...props }) {
  return (
    <Pressable
      className={cn(
        'flex flex-row items-center gap-2 px-3 py-2 rounded-md',
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

export function SidebarMenuButton({ children, className, ...props }) {
  return (
    <Pressable
      className={cn(
        'flex flex-row items-center gap-2 px-3 py-2 rounded-md w-full',
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
