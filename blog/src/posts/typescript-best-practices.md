---
title: "TypeScript Best Practices: Writing Better Type-Safe Code"
description: "Discover essential TypeScript best practices that will help you write more maintainable, type-safe code in your React applications."
date: "2024-01-25"
tags: ["TypeScript", "JavaScript", "React", "Best Practices"]
author: "Chris Kenrick"
readTime: "6 min read"
---

# TypeScript Best Practices: Writing Better Type-Safe Code

TypeScript has revolutionized how we write JavaScript, providing type safety and better developer experience. Here are the best practices I've learned from years of working with TypeScript in production applications.

## 1. Use Strict Mode Configuration

Always start with a strict TypeScript configuration:

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## 2. Define Clear Interface Contracts

Create explicit interfaces for your data structures:

```typescript
// Good: Clear, specific interface
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

// Avoid: Using 'any' or overly generic types
interface BadUser {
  id: any;
  data: any;
}
```

## 3. Leverage Union Types and Type Guards

Use union types for better type safety:

```typescript
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface ApiResponse<T> {
  status: LoadingState;
  data?: T;
  error?: string;
}

// Type guard function
function isSuccessResponse<T>(response: ApiResponse<T>): response is ApiResponse<T> & { status: 'success'; data: T } {
  return response.status === 'success' && response.data !== undefined;
}

// Usage
function handleResponse<T>(response: ApiResponse<T>) {
  if (isSuccessResponse(response)) {
    // TypeScript knows response.data exists and is type T
    console.log(response.data);
  }
}
```

## 4. Use Generics for Reusable Components

Create flexible, reusable React components with generics:

```typescript
interface SelectOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface SelectProps<T> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
}

function Select<T extends string | number>({
  options,
  value,
  onChange,
  placeholder
}: SelectProps<T>) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Usage with type safety
const statusOptions: SelectOption<'active' | 'inactive' | 'pending'>[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' }
];
```

## 5. Proper Error Handling with Discriminated Unions

Create type-safe error handling patterns:

```typescript
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function fetchUser(id: string): Promise<Result<User, string>> {
  try {
    const response = await api.get(`/users/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch user' };
  }
}

// Usage
async function handleUserFetch(id: string) {
  const result = await fetchUser(id);
  
  if (result.success) {
    // TypeScript knows result.data is User
    console.log(result.data.name);
  } else {
    // TypeScript knows result.error is string
    console.error(result.error);
  }
}
```

## 6. Use Utility Types Effectively

Leverage TypeScript's built-in utility types:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Create types for different use cases
type UserProfile = Omit<User, 'password'>;
type CreateUserRequest = Omit<User, 'id' | 'createdAt'>;
type UpdateUserRequest = Partial<Pick<User, 'name' | 'email'>>;

// API response type
type ApiUser = Required<Pick<User, 'id' | 'name' | 'email'>> & {
  lastLogin?: Date;
};
```

## 7. Strong Typing for Event Handlers

Type your event handlers properly in React:

```typescript
interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

## 8. Environment and Configuration Types

Type your environment variables and configuration:

```typescript
interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  API_BASE_URL: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
}

// Validate and type environment variables
function getConfig(): EnvironmentConfig {
  const config: EnvironmentConfig = {
    NODE_ENV: process.env.NODE_ENV as EnvironmentConfig['NODE_ENV'] || 'development',
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || 'default-secret'
  };

  // Validate required fields
  if (!config.DATABASE_URL) {
    throw new Error('DATABASE_URL is required');
  }

  return config;
}
```

## 9. Custom Hooks with Proper Types

Create well-typed custom hooks:

```typescript
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useApi<T>(url: string): UseApiState<T> & {
  refetch: () => Promise<void>;
} {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: T = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData
  };
}
```

## 10. Avoid Common Anti-Patterns

```typescript
// ❌ Don't use 'any'
const badFunction = (data: any) => data.something;

// ✅ Use proper types
const goodFunction = <T extends { something: unknown }>(data: T) => data.something;

// ❌ Don't use 'as' for type assertions without validation
const badCast = response as User;

// ✅ Use type guards or validation
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null && 'id' in obj;
}

const validatedUser = isUser(response) ? response : null;
```

## Key Takeaways

1. **Start strict** - Use strict TypeScript configuration from day one
2. **Be explicit** - Define clear interfaces and types
3. **Use utilities** - Leverage TypeScript's built-in utility types
4. **Type your events** - Properly type React event handlers
5. **Validate at boundaries** - Use type guards for external data
6. **Generic when reusable** - Use generics for flexible components
7. **Avoid 'any'** - Resist the temptation to use 'any'

TypeScript's power lies in its ability to catch errors at compile time and provide excellent developer experience. By following these practices, you'll write more maintainable and reliable code.

---

*What TypeScript patterns have you found most helpful in your projects? Share your experiences in the comments!*