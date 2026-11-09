import { View, TextInput } from 'react-native';
import { cn } from '../../lib/utils';
import { useRef, useState } from 'react';

export function InputOTP({ length = 6, value = '', onValueChange, className, ...props }) {
  const inputs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleChange = (text, index) => {
    const newValue = value.split('');
    newValue[index] = text;
    const updatedValue = newValue.join('');
    onValueChange?.(updatedValue);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View className={cn('flex flex-row gap-2', className)} {...props}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          value={value[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => setFocusedIndex(index)}
          maxLength={1}
          keyboardType="number-pad"
          className={cn(
            'h-12 w-12 text-center text-lg font-medium rounded-md border border-slate-300',
            'bg-white focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20',
            focusedIndex === index && 'border-slate-900 ring-2 ring-slate-900/20'
          )}
        />
      ))}
    </View>
  );
}
