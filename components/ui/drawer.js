import { Modal, View, Text, Pressable, Dimensions } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export function Drawer({ open, onOpenChange, children, side = 'left' }) {
  return typeof children === 'function' ? children({ open, onOpenChange, side }) : children;
}

export function DrawerTrigger({ children, onPress, ...props }) {
  return (
    <Pressable onPress={onPress} {...props}>
      {children}
    </Pressable>
  );
}

export function DrawerContent({ open, onClose, side = 'left', children, className, ...props }) {
  const sideStyles = {
    left: { left: 0, width: width * 0.75 },
    right: { right: 0, width: width * 0.75 },
    top: { top: 0, width: '100%' },
    bottom: { bottom: 0, width: '100%' },
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/50"
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          style={sideStyles[side]}
          className={cn(
            'absolute bg-white p-6 shadow-lg',
            className
          )}
          {...props}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function DrawerHeader({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-col space-y-2 mb-4', className)} {...props}>
      {children}
    </View>
  );
}

export function DrawerTitle({ children, className, ...props }) {
  return (
    <Text className={cn('text-lg font-semibold text-slate-900', className)} {...props}>
      {children}
    </Text>
  );
}

export function DrawerDescription({ children, className, ...props }) {
  return (
    <Text className={cn('text-sm text-slate-500', className)} {...props}>
      {children}
    </Text>
  );
}

export function DrawerFooter({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-row justify-end gap-2 mt-6', className)} {...props}>
      {children}
    </View>
  );
}

export function DrawerClose({ children, onPress, className, ...props }) {
  return (
    <Pressable onPress={onPress} className={cn('', className)} {...props}>
      {children}
    </Pressable>
  );
}
