import { describe, it, expect, vi } from 'vitest';
import { generateSEOMetadata, updateDocumentTitle, updateMetaTags } from '../seo';

describe('SEO Utils', () => {
  it('should generate SEO metadata', () => {
    const mockData = {
      title: 'Test Title',
      description: 'Test Description',
      keywords: ['test', 'keywords'],
      url: 'https://example.com'
    };
    
    const metadata = generateSEOMetadata(mockData);
    
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe('Test Title');
    expect(metadata.description).toBe('Test Description');
  });

  it('should update document title', () => {
    updateDocumentTitle('Test Title');
    expect(document.title).toBe('Test Title');
  });

  it('should handle metadata updates', () => {
    const mockMeta = {
      title: 'Test Title',
      description: 'Test Description',
      keywords: 'test, keywords'
    };
    
    updateMetaTags(mockMeta);
    
    // Check that the function executes without errors
    expect(document.title).toBe('Test Title');
  });

  it('should handle empty metadata gracefully', () => {
    expect(() => {
      generateSEOMetadata({});
    }).not.toThrow();
  });
}); 