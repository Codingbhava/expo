import { View } from 'react-native';
import { cn } from '../../lib/utils';

export function Item({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-row items-center py-2', className)} {...props}>
      {children}
    </View>
  );
}
