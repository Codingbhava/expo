import { View, Text } from 'react-native';
import { cn } from '../../lib/utils';

export function Table({ children, className, ...props }) {
  return (
    <View className={cn('w-full border border-slate-200 rounded-lg overflow-hidden', className)} {...props}>
      {children}
    </View>
  );
}

export function TableHeader({ children, className, ...props }) {
  return (
    <View className={cn('border-b border-slate-200 bg-slate-50', className)} {...props}>
      {children}
    </View>
  );
}

export function TableBody({ children, className, ...props }) {
  return (
    <View className={cn('', className)} {...props}>
      {children}
    </View>
  );
}

export function TableFooter({ children, className, ...props }) {
  return (
    <View className={cn('border-t border-slate-200 bg-slate-50', className)} {...props}>
      {children}
    </View>
  );
}

export function TableRow({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-row border-b border-slate-200 last:border-0', className)} {...props}>
      {children}
    </View>
  );
}

export function TableHead({ children, className, ...props }) {
  return (
    <View className={cn('flex-1 px-4 py-3', className)} {...props}>
      <Text className="text-xs font-medium text-slate-500 uppercase">{children}</Text>
    </View>
  );
}

export function TableCell({ children, className, ...props }) {
  return (
    <View className={cn('flex-1 px-4 py-3', className)} {...props}>
      {typeof children === 'string' ? (
        <Text className="text-sm text-slate-900">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

export function TableCaption({ children, className, ...props }) {
  return (
    <View className={cn('px-4 py-2', className)} {...props}>
      <Text className="text-sm text-slate-500">{children}</Text>
    </View>
  );
}
