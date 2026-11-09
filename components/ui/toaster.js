import { View } from 'react-native';
import { Toast } from './toast';
import { useToast } from '../../lib/ToastContext';
import { cn } from '../../lib/utils';

export function Toaster({ className, ...props }) {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <View
      className={cn(
        'absolute top-14 right-0 left-0 z-50 px-4',
        className
      )}
      style={{ pointerEvents: 'box-none' }}
      {...props}
    >
      {toasts.map((toast) => (
        <View key={toast.id} className="mb-2">
          <Toast
            {...toast}
            onClose={() => dismiss(toast.id)}
          />
        </View>
      ))}
    </View>
  );
}
