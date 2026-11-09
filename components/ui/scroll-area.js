import { ScrollView } from 'react-native';
import { cn } from '../../lib/utils';

export function ScrollArea({ children, className, ...props }) {
  return (
    <ScrollView
      className={cn('', className)}
      showsVerticalScrollIndicator={true}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
