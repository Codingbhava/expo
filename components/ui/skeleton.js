import { View } from 'react-native';
import { cn } from '../../lib/utils';

export function Skeleton({ className, ...props }) {
  return (
    <View
      className={cn(
        'animate-pulse rounded-md bg-slate-200',
        className
      )}
      {...props}
    />
  );
}
