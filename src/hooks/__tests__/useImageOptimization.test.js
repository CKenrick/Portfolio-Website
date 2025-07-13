import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useImageOptimization } from '../useImageOptimization';

describe('useImageOptimization', () => {
  it('should return optimization functions', () => {
    const { result } = renderHook(() => useImageOptimization());
    
    expect(result.current).toHaveProperty('optimizeImage');
    expect(result.current).toHaveProperty('preloadImage');
    expect(result.current).toHaveProperty('lazyLoadImage');
    expect(typeof result.current.optimizeImage).toBe('function');
    expect(typeof result.current.preloadImage).toBe('function');
    expect(typeof result.current.lazyLoadImage).toBe('function');
  });

  it('should handle image optimization', async () => {
    const { result } = renderHook(() => useImageOptimization());
    
    // Mock image source
    const mockSrc = 'test-image.jpg';
    const optimizedSrc = await result.current.optimizeImage(mockSrc);
    
    expect(optimizedSrc).toBeDefined();
    expect(typeof optimizedSrc).toBe('string');
  });

  it('should handle preload functionality', async () => {
    const { result } = renderHook(() => useImageOptimization());
    
    // Mock image preload
    const mockSrc = 'test-image.jpg';
    const preloadResult = await result.current.preloadImage(mockSrc);
    
    expect(preloadResult).toBeDefined();
  });
}); 