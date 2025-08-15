import { getAllPosts } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <section className="py-12 px-4 md:px-8 max-w-12xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-primary-light to-blue-600 bg-clip-text text-transparent">
            Welcome to My Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Insights about frontend development, React, TypeScript, and modern web technologies.
            Join me as I share my experiences and learnings in the world of software development.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-primary-light/10 to-blue-500/10 rounded-full p-12 mb-8 inline-block">
                <svg className="w-20 h-20 text-primary-light mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                No posts yet
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                I&apos;m working on some great content. Check back soon for new posts!
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}