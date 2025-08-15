import { getAllTags, getAllPosts } from '@/lib/blog';
import TagBadge from '@/components/TagBadge';

export const metadata = {
  title: 'Tags | Chris Kenrick\'s Blog',
  description: 'Browse all tags and topics covered in my blog posts about frontend development and web technologies.',
};

export default function TagsPage() {
  const tags = getAllTags();
  const posts = getAllPosts();
  
  // Count posts for each tag
  const tagCounts = tags.reduce((acc, tag) => {
    acc[tag] = posts.filter(post => 
      post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
    ).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Browse by Tags
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore topics and technologies I write about
          </p>
        </header>

        {tags.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tags.map((tag) => (
              <div key={tag} className="flex justify-center">
                <TagBadge 
                  tag={tag} 
                  count={tagCounts[tag]} 
                  size="lg"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-8 mb-6 inline-block">
                <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No tags yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tags will appear here once I start publishing posts.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}