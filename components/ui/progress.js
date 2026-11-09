import { View, Text } from 'react-native';
import { cn } from '../../lib/utils';

export function Progress({ value = 0, max = 100, className, ...props }) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <View
      className={cn(
        'relative h-4 w-full overflow-hidden rounded-full bg-slate-100',
        className
      )}
      {...props}
    >
      <View
        className="h-full bg-slate-900"
        style={{ width: `${percentage}%` }}
      />
    </View>
  );
}
