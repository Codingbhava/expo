import { View, ScrollView, Dimensions } from 'react-native';
import { cn } from '../../lib/utils';
import { useState, useRef } from 'react';

const { width: screenWidth } = Dimensions.get('window');

export function Carousel({ children, className, ...props }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View className={cn('relative', className)} {...props}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
      {/* Dots indicator */}
      <View className="absolute bottom-4 left-0 right-0 flex flex-row justify-center gap-2">
        {children && children.length > 0 && Array.isArray(children) &&
          children.map((_, index) => (
            <View
              key={index}
              className={cn(
                'h-2 w-2 rounded-full',
                index === activeIndex ? 'bg-slate-900' : 'bg-slate-300'
              )}
            />
          ))}
      </View>
    </View>
  );
}

export function CarouselItem({ children, className, ...props }) {
  return (
    <View
      style={{ width: screenWidth }}
      className={cn('', className)}
      {...props}
    >
      {children}
    </View>
  );
}
