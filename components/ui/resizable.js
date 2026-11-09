import { View, PanResponder } from 'react-native';
import { cn } from '../../lib/utils';
import { useState, useRef } from 'react';

export function ResizablePanelGroup({ children, direction = 'horizontal', className, ...props }) {
  return (
    <View 
      className={cn(
        'flex',
        direction === 'horizontal' ? 'flex-row' : 'flex-col',
        className
      )} 
      {...props}
    >
      {children}
    </View>
  );
}

export function ResizablePanel({ children, defaultSize = 50, minSize = 20, maxSize = 80, className, ...props }) {
  const [size, setSize] = useState(defaultSize);

  return (
    <View 
      style={{ flex: size / 100 }}
      className={cn('', className)} 
      {...props}
    >
      {children}
    </View>
  );
}

export function ResizableHandle({ className, ...props }) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // Handle resize logic here
        console.log('Resizing:', gestureState.dx, gestureState.dy);
      },
    })
  ).current;

  return (
    <View
      {...panResponder.panHandlers}
      className={cn(
        'w-1 bg-slate-200 active:bg-slate-400 cursor-col-resize',
        className
      )}
      {...props}
    />
  );
}
