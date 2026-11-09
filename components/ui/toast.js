import { View, Text, Pressable } from 'react-native';
import { cn } from '../../lib/utils';

export function Toast({ variant = 'default', title, description, onClose, className, ...props }) {
  const variants = {
    default: 'bg-white border-slate-200',
    destructive: 'bg-red-50 border-red-500',
    success: 'bg-green-50 border-green-500',
  };

  const textColors = {
    default: 'text-slate-900',
    destructive: 'text-red-900',
    success: 'text-green-900',
  };

  const descriptionColors = {
    default: 'text-slate-500',
    destructive: 'text-red-700',
    success: 'text-green-700',
  };

  return (
    <View
      className={cn(
        'pointer-events-auto w-full rounded-lg border-2 p-4 shadow-lg',
        variants[variant],
        className
      )}
      {...props}
    >
      <View className="flex flex-row items-start justify-between">
        <View className="flex-1">
          {title && (
            <Text className={cn('text-sm font-semibold mb-1', textColors[variant])}>
              {title}
            </Text>
          )}
          {description && (
            <Text className={cn('text-sm', descriptionColors[variant])}>
              {description}
            </Text>
          )}
        </View>
        {onClose && (
          <Pressable onPress={onClose} className="ml-4">
            <Text className="text-slate-400 text-lg">✕</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
