import { View, Text } from 'react-native';
import { cn } from '../../lib/utils';
import { useToast } from './use-toast';

// Sonner is an alternative toast implementation
// This uses the same toast system but with a different style

export function Sonner() {
  const { toasts } = useToast();

  return (
    <View className="fixed top-0 right-0 z-50 p-4">
      {toasts.map((toast) => (
        <View
          key={toast.id}
          className={cn(
            'mb-2 rounded-lg p-4 shadow-lg',
            toast.variant === 'destructive' && 'bg-red-500',
            toast.variant === 'success' && 'bg-green-500',
            !toast.variant && 'bg-slate-900'
          )}
        >
          {toast.title && (
            <Text className="text-sm font-semibold text-white mb-1">
              {toast.title}
            </Text>
          )}
          {toast.description && (
            <Text className="text-sm text-white/90">
              {toast.description}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
