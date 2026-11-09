import { View, Text, Pressable } from 'react-native';
import { cn } from '../../lib/utils';

export function Pagination({ currentPage, totalPages, onPageChange, className, ...props }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <View className={cn('flex flex-row items-center gap-1', className)} {...props}>
      <PaginationPrevious
        disabled={currentPage === 1}
        onPress={() => onPageChange(currentPage - 1)}
      />
      {pages.map((page) => (
        <PaginationItem
          key={page}
          isActive={page === currentPage}
          onPress={() => onPageChange(page)}
        >
          {page}
        </PaginationItem>
      ))}
      <PaginationNext
        disabled={currentPage === totalPages}
        onPress={() => onPageChange(currentPage + 1)}
      />
    </View>
  );
}

export function PaginationContent({ children, className, ...props }) {
  return (
    <View className={cn('flex flex-row items-center gap-1', className)} {...props}>
      {children}
    </View>
  );
}

export function PaginationItem({ isActive, children, onPress, className, ...props }) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'h-9 w-9 flex items-center justify-center rounded-md',
        isActive
          ? 'bg-slate-900 text-white'
          : 'bg-transparent text-slate-900 active:bg-slate-100',
        className
      )}
      {...props}
    >
      <Text className={cn('text-sm', isActive && 'text-white')}>
        {children}
      </Text>
    </Pressable>
  );
}

export function PaginationPrevious({ disabled, onPress, className, ...props }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn(
        'h-9 px-3 flex items-center justify-center rounded-md',
        'bg-transparent active:bg-slate-100',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <Text className="text-sm text-slate-900">←</Text>
    </Pressable>
  );
}

export function PaginationNext({ disabled, onPress, className, ...props }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn(
        'h-9 px-3 flex items-center justify-center rounded-md',
        'bg-transparent active:bg-slate-100',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <Text className="text-sm text-slate-900">→</Text>
    </Pressable>
  );
}

export function PaginationEllipsis({ className, ...props }) {
  return (
    <View className={cn('h-9 w-9 flex items-center justify-center', className)} {...props}>
      <Text className="text-sm text-slate-900">...</Text>
    </View>
  );
}
