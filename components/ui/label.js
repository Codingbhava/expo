import { Text } from 'react-native';
import { cn } from '../../lib/utils';

export function Label({ children, required, className, ...props }) {
  return (
    <Text
      className={cn(
        'text-sm font-medium text-slate-900 leading-none',
        className
      )}
      {...props}
    >
      {children}
      {required && <Text className="text-red-500 ml-1">*</Text>}
    </Text>
  );
}
