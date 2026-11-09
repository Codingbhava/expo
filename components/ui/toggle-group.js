import { View } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function ToggleGroup({ type = 'single', value, onValueChange, children, className, ...props }) {
  const [internalValue, setInternalValue] = useState(type === 'single' ? null : []);
  const currentValue = value !== undefined ? value : internalValue;

  const handleToggle = (itemValue) => {
    if (type === 'single') {
      const newValue = currentValue === itemValue ? null : itemValue;
      setInternalValue(newValue);
      onValueChange?.(newValue);
    } else {
      const newValue = currentValue.includes(itemValue)
        ? currentValue.filter(v => v !== itemValue)
        : [...currentValue, itemValue];
      setInternalValue(newValue);
      onValueChange?.(newValue);
    }
  };

  const isPressed = (itemValue) => {
    return type === 'single'
      ? currentValue === itemValue
      : currentValue.includes(itemValue);
  };

  return (
    <View className={cn('flex flex-row gap-1', className)} {...props}>
      {typeof children === 'function' ? children({ handleToggle, isPressed }) : children}
    </View>
  );
}

export function ToggleGroupItem({ value, handleToggle, isPressed, children, className, ...props }) {
  return (
    <View className={cn('', className)} {...props}>
      {typeof children === 'function' ? children({ onPress: () => handleToggle(value), pressed: isPressed(value) }) : children}
    </View>
  );
}
