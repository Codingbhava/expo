import { Modal, View, Pressable } from 'react-native';
import { cn } from '../../lib/utils';

export function HoverCard({ children }) {
  return <>{children}</>;
}

export function HoverCardTrigger({ children, ...props }) {
  return children;
}

export function HoverCardContent({ children, className, ...props }) {
  return (
    <View
      className={cn(
        'z-50 w-64 rounded-md border border-slate-200 bg-white p-4 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}
