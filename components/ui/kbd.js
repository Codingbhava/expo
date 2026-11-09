import { Text } from 'react-native';
import { cn } from '../../lib/utils';

export function Kbd({ children, className, ...props }) {
  return (
    <Text
      className={cn(
        'inline-flex items-center justify-center rounded border border-slate-200',
        'bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-900',
        'shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </Text>
  );
}
