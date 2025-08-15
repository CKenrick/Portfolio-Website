export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  readTime: string;
  content: string;
  excerpt: string;
}

export interface BlogMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  readTime?: string;
}