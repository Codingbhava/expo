import { View } from 'react-native';
import { cn } from '../../lib/utils';

export function Card({ children, className, ...props }) {
  return (
    <View
      className={cn(
        'rounded-lg border border-slate-200 bg-white shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
      {children}
    </View>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <View className={cn('', className)} {...props}>
      {children}
    </View>
  );
}

export function CardDescription({ children, className, ...props }) {
  return (
    <View className={cn('', className)} {...props}>
      {children}
    </View>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <View className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </View>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-row items-center p-6 pt-0', className)} {...props}>
      {children}
    </View>
  );
}
