import { View, Text } from 'react-native';
import { cn } from '../../lib/utils';

export function Field({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-col space-y-2', className)} {...props}>
      {children}
    </View>
  );
}

export function FieldLabel({ children, required, className, ...props }) {
  return (
    <Text className={cn('text-sm font-medium text-slate-900', className)} {...props}>
      {children}
      {required && <Text className="text-red-500 ml-1">*</Text>}
    </Text>
  );
}

export function FieldDescription({ children, className, ...props }) {
  return (
    <Text className={cn('text-xs text-slate-500', className)} {...props}>
      {children}
    </Text>
  );
}

export function FieldError({ children, className, ...props }) {
  if (!children) return null;

  return (
    <Text className={cn('text-xs text-red-500', className)} {...props}>
      {children}
    </Text>
  );
}
