/**
 * A simple utility to merge tailwind classes.
 * In a real-world scenario, you might want to use `clsx` and `tailwind-merge`.
 */
export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}
