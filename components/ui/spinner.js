import { View, ActivityIndicator } from 'react-native';
import { cn } from '../../lib/utils';

export function Spinner({ size = 'small', color = '#0f172a', className, ...props }) {
  return (
    <View className={cn('flex items-center justify-center', className)} {...props}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}
