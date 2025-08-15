import Link from 'next/link';

interface TagBadgeProps {
  tag: string;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function TagBadge({ tag, count, size = 'md' }: TagBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <Link
      href={`/tags/${tag.toLowerCase()}`}
      className={`inline-flex items-center font-medium bg-primary-light/10 dark:bg-primary-dark/20 text-primary-light dark:text-primary-dark rounded-full hover:bg-primary-light/20 dark:hover:bg-primary-dark/30 transition-colors duration-200 ${sizeClasses[size]}`}
    >
      {tag}
      {count !== undefined && (
        <span className="ml-2 bg-primary-light/20 dark:bg-primary-dark/30 text-primary-dark dark:text-primary-light rounded-full px-2 py-0.5 text-xs">
          {count}
        </span>
      )}
    </Link>
  );
}