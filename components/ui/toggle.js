import { View, Text, Pressable } from 'react-native';
import { cn } from '../../lib/utils';

export function Toggle({ pressed, onPressedChange, children, variant = 'default', size = 'default', className, ...props }) {
  const variants = {
    default: pressed
      ? 'bg-slate-100'
      : 'bg-transparent hover:bg-slate-100',
    outline: pressed
      ? 'bg-slate-100 border-slate-300'
      : 'border-slate-200 hover:bg-slate-100',
  };

  const sizes = {
    default: 'h-9 px-3',
    sm: 'h-8 px-2',
    lg: 'h-10 px-4',
  };

  return (
    <Pressable
      onPress={() => onPressedChange?.(!pressed)}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium',
        'border border-transparent',
        'active:bg-slate-200',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm text-slate-900">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
