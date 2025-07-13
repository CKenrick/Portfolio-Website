import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// React 19 inspired data fetching hook
export const useAsyncData = (asyncFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();
      
      const result = await asyncFunction(abortControllerRef.current.signal);
      
      // Only update state if the request wasn't aborted
      if (!abortControllerRef.current.signal.aborted) {
        setData(result);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, [asyncFunction, ...dependencies]);

  useEffect(() => {
    fetchData();
    
    // Cleanup: abort any pending requests
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

// React 19 inspired use() hook pattern simulation
export const createResource = (asyncFunction) => {
  let status = 'pending';
  let result = null;
  let error = null;
  
  const promise = asyncFunction()
    .then((data) => {
      status = 'fulfilled';
      result = data;
      return data;
    })
    .catch((err) => {
      status = 'rejected';
      error = err;
      throw err;
    });

  return {
    read() {
      if (status === 'pending') {
        throw promise; // Suspense will catch this
      }
      if (status === 'rejected') {
        throw error;
      }
      return result;
    },
    status,
    promise
  };
};

// Modern React 19 patterns for concurrent features
export const useDeferredValue = (value) => {
  const [deferredValue, setDeferredValue] = useState(value);
  
  useEffect(() => {
    // Simulate React 19's useDeferredValue behavior
    const timeoutId = setTimeout(() => {
      setDeferredValue(value);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [value]);
  
  return deferredValue;
};

// React 19 inspired concurrent state management
// export const useOptimistic = (passthrough, reducer) => {
//   const [optimisticState, setOptimisticState] = useState(passthrough);
//   const [pendingActions, setPendingActions] = useState([]);
  
//   // Stabilize the reducer to prevent recreation
//   const stableReducer = useCallback(reducer, []);
  
//   const addOptimistic = useCallback((action) => {
//     setPendingActions(prev => [...prev, action]);
//     setOptimisticState(prev => stableReducer(prev, action));
//   }, [stableReducer]);
  
//   // Use useRef to track the previous passthrough value
//   const prevPassthrough = useRef(passthrough);
  
//   useEffect(() => {
//     // Only update if the passthrough actually changed
//     if (prevPassthrough.current !== passthrough) {
//       setOptimisticState(passthrough);
//       setPendingActions([]);
//       prevPassthrough.current = passthrough;
//     }
//   }, [passthrough]);
  
//   return [optimisticState, addOptimistic];
// };

// // Enhanced error handling with React 19 patterns
// export const useErrorBoundary = () => {
//   const [error, setError] = useState(null);
  
//   const captureError = useCallback((error) => {
//     setError(error);
//   }, []);
  
//   const resetError = useCallback(() => {
//     setError(null);
//   }, []);
  
//   useEffect(() => {
//     if (error) {
//       throw error;
//     }
//   }, [error]);
  
//   return { captureError, resetError };
// };

// React 19 inspired data fetching with automatic retries
export const useRetryableData = (asyncFunction, options = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    exponentialBackoff = true,
    ...fetchOptions
  } = options;
  
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  
  // Stabilize the options to prevent recreation
  const stableOptions = useMemo(() => ({
    maxRetries,
    retryDelay,
    exponentialBackoff
  }), [maxRetries, retryDelay, exponentialBackoff]);
  
  const retryableFunction = useCallback(async (signal) => {
    let lastError;
    
    for (let attempt = 0; attempt <= stableOptions.maxRetries; attempt++) {
      try {
        const result = await asyncFunction(signal);
        setRetryCount(0);
        setIsRetrying(false);
        return result;
      } catch (error) {
        lastError = error;
        
        if (signal?.aborted || attempt === stableOptions.maxRetries) {
          throw error;
        }
        
        setRetryCount(attempt + 1);
        setIsRetrying(true);
        
        const delay = stableOptions.exponentialBackoff 
          ? stableOptions.retryDelay * Math.pow(2, attempt)
          : stableOptions.retryDelay;
          
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  }, [asyncFunction, stableOptions.maxRetries, stableOptions.retryDelay, stableOptions.exponentialBackoff]);

  const { data, loading, error, refetch } = useAsyncData(retryableFunction, []);
  
  return { 
    data, 
    loading: loading || isRetrying, 
    error, 
    refetch, 
    retryCount,
    isRetrying 
  };
};

// React 19 inspired batch update simulation
export const useBatchedUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const pendingUpdates = useRef([]);
  
  const addUpdate = useCallback((update) => {
    pendingUpdates.current.push(update);
    
    // Batch updates using React's automatic batching (React 19 feature)
    Promise.resolve().then(() => {
      if (pendingUpdates.current.length > 0) {
        setUpdates(prev => [...prev, ...pendingUpdates.current]);
        pendingUpdates.current = [];
      }
    });
  }, []);
  
  const clearUpdates = useCallback(() => {
    setUpdates([]);
    pendingUpdates.current = [];
  }, []);
  
  return { updates, addUpdate, clearUpdates };
};

export default useAsyncData; 