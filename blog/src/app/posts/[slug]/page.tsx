import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { getAllPostSlugs, getPostBySlug, getPostContent } from '@/lib/blog';
import TagBadge from '@/components/TagBadge';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Chris Kenrick's Blog`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const content = await getPostContent(slug);

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          href="/"
          className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
        >
          ← Back to all posts
        </Link>
      </nav>

      {/* Post Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          {post.description}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <span>By {post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
          </div>
          <span>{post.readTime}</span>
        </div>
      </header>

      {/* Post Content */}
      <div 
        className="prose prose-lg max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Post Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags:</span>
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} size="sm" />
          ))}
        </div>
        
        <nav className="flex justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
          >
            ← Back to all posts
          </Link>
        </nav>
      </footer>
    </article>
  );
}