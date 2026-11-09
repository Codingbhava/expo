import { View, Text, Pressable } from 'react-native';
import { cn } from '../../lib/utils';

export function RadioGroup({ children, value, onValueChange, className, ...props }) {
  return (
    <View className={cn('flex flex-col space-y-2', className)} {...props}>
      {typeof children === 'function' ? children({ value, onValueChange }) : children}
    </View>
  );
}

export function RadioGroupItem({ value: itemValue, id, label, groupValue, onValueChange, className, ...props }) {
  const isChecked = groupValue === itemValue;

  return (
    <Pressable
      onPress={() => onValueChange(itemValue)}
      className="flex flex-row items-center space-x-2"
      {...props}
    >
      <View
        className={cn(
          'h-5 w-5 rounded-full border-2 items-center justify-center',
          isChecked
            ? 'border-slate-900'
            : 'border-slate-300',
          className
        )}
      >
        {isChecked && (
          <View className="h-2.5 w-2.5 rounded-full bg-slate-900" />
        )}
      </View>
      {label && (
        <Text className="text-sm text-slate-900">{label}</Text>
      )}
    </Pressable>
  );
}
