import { View, Pressable, Text } from 'react-native';
import { cn } from '../../lib/utils';

export function Checkbox({ checked, onCheckedChange, label, className, ...props }) {
  return (
    <View className="flex flex-row items-center space-x-2">
      <Pressable
        onPress={() => onCheckedChange?.(!checked)}
        className={cn(
          'h-5 w-5 rounded border-2',
          checked
            ? 'bg-slate-900 border-slate-900'
            : 'border-slate-300 bg-white',
          className
        )}
        {...props}
      >
        {checked && (
          <Text className="text-white text-xs text-center">✓</Text>
        )}
      </Pressable>
      {label && (
        <Text className="text-sm text-slate-900">{label}</Text>
      )}
    </View>
  );
}
