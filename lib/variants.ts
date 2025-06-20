export const variants = {
  default:
    'bg-black text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 rounded-md disabled:opacity-25',
  outline:
    'border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-25',
  ghost:
    'rounded-md bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-gray-500 disabled:opacity-25',
  danger:
    'bg-red-500 text-white hover:bg-red-700 dark:hover:bg-red-700 rounded-md disabled:opacity-75',
} as const;

export const sizes = {
  xs: 'text-xs px-2 py-1',
  sm: 'text-sm px-3 py-1.5',
  base: 'text-base px-4 py-2',
  lg: 'text-lg px-4 py-2',
} as const;

export type Variant = keyof typeof variants; //'default' | 'outline' | 'ghost';
export type Size = keyof typeof sizes; //'xs' | 'sm' | 'base' | 'lg';
