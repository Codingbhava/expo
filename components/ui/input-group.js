import { View, TextInput } from 'react-native';
import { cn } from '../../lib/utils';

export function InputGroup({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-row items-center', className)} {...props}>
      {children}
    </View>
  );
}

export function InputAddon({ children, className, ...props }) {
  return (
    <View
      className={cn(
        'flex items-center justify-center px-3 bg-slate-100 border border-slate-300',
        'first:rounded-l-md last:rounded-r-md',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export function InputLeftAddon({ children, className, ...props }) {
  return (
    <View
      className={cn(
        'flex items-center justify-center px-3 bg-slate-100 border border-slate-300 rounded-l-md border-r-0',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export function InputRightAddon({ children, className, ...props }) {
  return (
    <View
      className={cn(
        'flex items-center justify-center px-3 bg-slate-100 border border-slate-300 rounded-r-md border-l-0',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export function InputLeftElement({ children, className, ...props }) {
  return (
    <View
      className={cn(
        'absolute left-0 flex items-center justify-center pl-3 h-full',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}

export function InputRightElement({ children, className, ...props }) {
  return (
    <View
      className={cn(
        'absolute right-0 flex items-center justify-center pr-3 h-full',
        className
      )}
      {...props}
    >
      {children}
    </View>
  );
}
