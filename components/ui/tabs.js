import { View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function Tabs({ children, defaultValue, className, ...props }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <View className={cn('w-full', className)} {...props}>
      {typeof children === 'function' ? children({ activeTab, setActiveTab }) : children}
    </View>
  );
}

export function TabsList({ children, className, ...props }) {
  return (
    <View
      className={cn(
        'flex flex-row h-10 items-center justify-center rounded-md bg-slate-100 p-1',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export function TabsTrigger({ children, value, activeTab, setActiveTab, className, ...props }) {
  const isActive = activeTab === value;

  return (
    <Pressable
      onPress={() => setActiveTab(value)}
      className={cn(
        'flex-1 flex items-center justify-center rounded-sm px-3 py-1.5',
        isActive ? 'bg-white shadow-sm' : '',
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          'text-sm font-medium',
          isActive ? 'text-slate-900' : 'text-slate-500'
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export function TabsContent({ children, value, activeTab, className, ...props }) {
  if (activeTab !== value) return null;

  return (
    <View className={cn('mt-2', className)} {...props}>
      {children}
    </View>
  );
}
