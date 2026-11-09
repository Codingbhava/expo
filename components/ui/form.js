import { View } from 'react-native';
import { cn } from '../../lib/utils';

export function Form({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-col space-y-4', className)} {...props}>
      {children}
    </View>
  );
}

export function FormField({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-col space-y-2', className)} {...props}>
      {children}
    </View>
  );
}

export function FormItem({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-col space-y-2', className)} {...props}>
      {children}
    </View>
  );
}
