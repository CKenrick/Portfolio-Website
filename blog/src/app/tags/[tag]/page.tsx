import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import TagBadge from '@/components/TagBadge';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  
  if (posts.length === 0) {
    return {
      title: 'Tag Not Found',
    };
  }

  const tagFormatted = tag.charAt(0).toUpperCase() + tag.slice(1);
  
  return {
    title: `Posts tagged "${tagFormatted}" | Chris Kenrick's Blog`,
    description: `Browse all posts about ${tagFormatted} on my blog covering frontend development and web technologies.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  
  if (posts.length === 0) {
    notFound();
  }

  const tagFormatted = tag.charAt(0).toUpperCase() + tag.slice(1);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm">
          <Link
            href="/"
            className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
          >
            All Posts
          </Link>
          <span className="text-gray-400 dark:text-gray-500">/</span>
          <Link
            href="/tags"
            className="text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
          >
            Tags
          </Link>
          <span className="text-gray-400 dark:text-gray-500">/</span>
          <span className="text-gray-600 dark:text-gray-300">{tagFormatted}</span>
        </div>
      </nav>

      {/* Page Header */}
      <header className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <TagBadge tag={tagFormatted} size="lg" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Posts about {tagFormatted}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
        </p>
      </header>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Back Navigation */}
      <nav className="mt-12 text-center">
        <Link
          href="/tags"
          className="inline-flex items-center text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
        >
          ← Browse all tags
        </Link>
      </nav>
    </div>
  );
}