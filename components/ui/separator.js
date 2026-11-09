import { View } from 'react-native';
import { cn } from '../../lib/utils';

export function Separator({ orientation = 'horizontal', className, ...props }) {
  return (
    <View
      className={cn(
        'bg-slate-200',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'w-[1px] h-full',
        className
      )}
      {...props}
    />
  );
}
