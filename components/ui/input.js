import { TextInput, View, Text } from 'react-native';
import { cn } from '../../lib/utils';

export function Input({ className, label, error, ...props }) {
  return (
    <View className="flex flex-col space-y-2">
      {label && (
        <Text className="text-sm font-medium text-slate-900">{label}</Text>
      )}
      <TextInput
        className={cn(
          'h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900',
          'focus:border-slate-400 focus:outline-none',
          error && 'border-red-500',
          className
        )}
        placeholderTextColor="#94a3b8"
        {...props}
      />
      {error && (
        <Text className="text-sm text-red-500">{error}</Text>
      )}
    </View>
  );
}
