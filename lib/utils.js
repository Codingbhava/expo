/**
 * Utility function for conditional className strings
 * Similar to clsx/classnames but simpler
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
