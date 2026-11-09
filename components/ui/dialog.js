import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function Dialog({ open, onOpenChange, children }) {
  return typeof children === 'function' ? children({ open, onOpenChange }) : children;
}

export function DialogTrigger({ children, onPress, ...props }) {
  return (
    <Pressable onPress={onPress} {...props}>
      {children}
    </Pressable>
  );
}

export function DialogContent({ open, onClose, children, className, ...props }) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/50"
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className={cn(
            'w-full max-w-lg rounded-lg bg-white p-6 shadow-lg mx-4',
            className
          )}
          {...props}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function DialogHeader({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-col space-y-1.5 mb-4', className)} {...props}>
      {children}
    </View>
  );
}

export function DialogTitle({ children, className, ...props }) {
  return (
    <Text className={cn('text-lg font-semibold text-slate-900', className)} {...props}>
      {children}
    </Text>
  );
}

export function DialogDescription({ children, className, ...props }) {
  return (
    <Text className={cn('text-sm text-slate-500', className)} {...props}>
      {children}
    </Text>
  );
}

export function DialogFooter({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-row justify-end gap-2 mt-6', className)} {...props}>
      {children}
    </View>
  );
}

export function DialogClose({ children, onPress, ...props }) {
  return (
    <Pressable onPress={onPress} {...props}>
      {children}
    </Pressable>
  );
}
