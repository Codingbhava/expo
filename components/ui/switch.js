import { View, Pressable } from 'react-native';
import { cn } from '../../lib/utils';

export function Switch({ checked, onCheckedChange, className, ...props }) {
  return (
    <Pressable
      onPress={() => onCheckedChange?.(!checked)}
      className={cn(
        'h-6 w-11 rounded-full',
        checked ? 'bg-slate-900' : 'bg-slate-200',
        className
      )}
      {...props}
    >
      <View
        className={cn(
          'h-5 w-5 m-0.5 rounded-full bg-white',
          checked && 'translate-x-5'
        )}
      />
    </Pressable>
  );
}
