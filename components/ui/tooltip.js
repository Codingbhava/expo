import { View, Text, Pressable } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function Tooltip({ children, content, side = 'top', className, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <View className="relative inline-block">
      <Pressable
        onPressIn={() => setVisible(true)}
        onPressOut={() => setVisible(false)}
      >
        {children}
      </Pressable>
      {visible && (
        <View
          className={cn(
            'absolute z-50 rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white shadow-md',
            side === 'top' && 'bottom-full left-1/2 -translate-x-1/2 mb-2',
            side === 'bottom' && 'top-full left-1/2 -translate-x-1/2 mt-2',
            side === 'left' && 'right-full top-1/2 -translate-y-1/2 mr-2',
            side === 'right' && 'left-full top-1/2 -translate-y-1/2 ml-2',
            className
          )}
          {...props}
        >
          <Text className="text-xs text-white">{content}</Text>
        </View>
      )}
    </View>
  );
}

export function TooltipProvider({ children }) {
  return <>{children}</>;
}

export function TooltipTrigger({ children, ...props }) {
  return children;
}

export function TooltipContent({ children, className, ...props }) {
  return (
    <View
      className={cn(
        'z-50 rounded-md bg-slate-900 px-3 py-1.5 text-sm text-white shadow-md',
        className
      )}
      {...props}
    >
      <Text className="text-xs text-white">{children}</Text>
    </View>
  );
}
