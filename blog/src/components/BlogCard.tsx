import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                className="px-3 py-1.5 text-xs font-semibold bg-primary-light/10 text-primary-light rounded-full hover:bg-primary-light/20 transition-colors duration-200"
              >
                {tag}
              </Link>
            ))}
          </div>
          <span className="text-sm text-gray-500 font-medium">
            {post.readTime}
          </span>
        </div>
        
        <Link href={`/posts/${post.slug}`} className="group mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-light transition-colors duration-200 line-clamp-2 leading-tight">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {post.author}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
            </span>
          </div>
          
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center text-primary-light hover:text-primary-dark font-semibold transition-colors duration-200 group"
          >
            Read more
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}