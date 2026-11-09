import { Modal, View, Pressable } from 'react-native';
import { cn } from '../../lib/utils';

export function Popover({ open, onOpenChange, children }) {
  return typeof children === 'function' ? children({ open, onOpenChange }) : children;
}

export function PopoverTrigger({ children, onPress, ...props }) {
  return (
    <Pressable onPress={onPress} {...props}>
      {children}
    </Pressable>
  );
}

export function PopoverContent({ open, onClose, children, side = 'bottom', className, ...props }) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1"
        onPress={onClose}
      >
        <View
          className={cn(
            'absolute bg-white rounded-lg border border-slate-200 p-4 shadow-lg',
            side === 'top' && 'bottom-full',
            side === 'bottom' && 'top-full',
            side === 'left' && 'right-full',
            side === 'right' && 'left-full',
            className
          )}
          {...props}
        >
          {children}
        </View>
      </Pressable>
    </Modal>
  );
}
