import { View, Pressable } from 'react-native';
import { cn } from '../../lib/utils';
import { useState } from 'react';

export function Slider({ value = 50, onValueChange, min = 0, max = 100, step = 1, className, ...props }) {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (newValue) => {
    setSliderValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <View className={cn('relative w-full', className)} {...props}>
      <View className="relative h-2 w-full rounded-full bg-slate-200">
        <View
          className="absolute h-full rounded-full bg-slate-900"
          style={{ width: `${((sliderValue - min) / (max - min)) * 100}%` }}
        />
        <View
          className="absolute h-5 w-5 rounded-full bg-white border-2 border-slate-900 -translate-y-1.5"
          style={{ left: `${((sliderValue - min) / (max - min)) * 100}%` }}
        />
      </View>
    </View>
  );
}
