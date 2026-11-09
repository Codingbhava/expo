import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '../../lib/utils';

export function Sheet({ open, onOpenChange, children, side = 'right' }) {
  return typeof children === 'function' ? children({ open, onOpenChange, side }) : children;
}

export function SheetTrigger({ children, onPress, ...props }) {
  return (
    <Pressable onPress={onPress} {...props}>
      {children}
    </Pressable>
  );
}

export function SheetContent({ open, onClose, side = 'right', children, className, ...props }) {
  const sideStyles = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'top-0 bottom-0 left-0 w-3/4',
    right: 'top-0 bottom-0 right-0 w-3/4',
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
          className={cn(
            'absolute bg-white p-6 shadow-lg',
            sideStyles[side],
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

export function SheetHeader({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-col space-y-2 mb-4', className)} {...props}>
      {children}
    </View>
  );
}

export function SheetTitle({ children, className, ...props }) {
  return (
    <Text className={cn('text-lg font-semibold text-slate-900', className)} {...props}>
      {children}
    </Text>
  );
}

export function SheetDescription({ children, className, ...props }) {
  return (
    <Text className={cn('text-sm text-slate-500', className)} {...props}>
      {children}
    </Text>
  );
}

export function SheetFooter({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-row justify-end gap-2 mt-6', className)} {...props}>
      {children}
    </View>
  );
}
