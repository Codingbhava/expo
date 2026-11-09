import { View, Text } from 'react-native';
import { cn } from '../../lib/utils';

export function Empty({ icon, title, description, action, className, ...props }) {
  return (
    <View
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4',
        className
      )}
      {...props}
    >
      {icon && <View className="mb-4">{icon}</View>}
      {title && (
        <Text className="text-lg font-semibold text-slate-900 mb-2">
          {title}
        </Text>
      )}
      {description && (
        <Text className="text-sm text-slate-500 text-center mb-4">
          {description}
        </Text>
      )}
      {action && <View>{action}</View>}
    </View>
  );
}
