# JourneyPick Code Guideline

This document serves as the single source of truth for coding standards and best practices for the JourneyPick project. Adhering to these guidelines ensures consistent, maintainable, high-quality, and performant code.

## 1. Project Overview

JourneyPick is a web-based marketplace connecting foreign tourists with local cultural experiences. It facilitates discovery, booking, and payment for unique local activities planned and operated by local "Planners." The platform supports multiple user roles: Tourist, Planner, Mid-level Admin, and Super Admin, each with specific functionalities.

**Key Architectural Decisions:**
*   **Serverless Architecture**: Leverages Next.js on Vercel for the frontend and Supabase (PostgreSQL, Auth, Storage, Edge Functions) as the integrated Backend-as-a-Service (BaaS).
*   **SSR/SSG for SEO**: Next.js's Server-Side Rendering (SSR) and Static Site Generation (SSG) are utilized to optimize SEO for product pages and improve initial loading performance.
*   **Client-Side Data Fetching (SWR/React Query)**: Most data interactions (e.g., product listings, user profiles) occur directly from the client to Supabase via its JS SDK, managed by SWR or React Query for caching and revalidation.
*   **Secure Server-Side Operations**: Sensitive operations like Stripe payment session creation and webhook handling are routed through Next.js API Routes or Supabase Edge Functions for enhanced security.
*   **Row Level Security (RLS)**: Supabase's RLS is extensively used to enforce fine-grained, role-based access control directly at the database level.
*   **Domain-Driven Organization**: Codebase is structured around business domains to improve modularity, cohesion, and maintainability.

## 2. Core Principles

1.  **Prioritize Readability and Simplicity**: Write code that is easy to understand and maintain by others, favoring clear, concise solutions over complex ones.
2.  **Ensure Data Security and Integrity**: Implement robust security measures, especially RLS, and validate all inputs to protect sensitive data and prevent unauthorized access.
3.  **Optimize for User Experience (Performance)**: Strive for fast load times, responsive interfaces, and efficient data handling to provide a seamless user experience.
4.  **Promote Modularity and Reusability**: Design components and functions to be single-responsibility, reusable, and easily composable across the application.

## 3. Language-Specific Guidelines (TypeScript, Next.js, React)

### File Organization and Directory Structure

Follow the established Domain-Driven Organization Strategy defined in the TRD.

```
/src/
├── app/                # Next.js App Router pages and layouts
├── components/         # Reusable, domain-agnostic UI components (e.g., Button, Modal)
│   ├── layout/         # Layout-specific components (e.g., Header, Footer)
│   └── ui/             # Generic UI primitives
├── domains/            # Business domain-specific modules (e.g., products, users, orders)
│   ├── [domain_name]/
│   │   ├── components/ # Components specific to this domain (e.g., ProductCard)
│   │   ├── hooks/      # React Hooks for this domain's logic (e.g., useProducts)
│   │   ├── services/   # API/Supabase interaction functions for this domain
│   │   ├── types/      # TypeScript types specific to this domain
│   │   └── utils/      # Utility functions specific to this domain
├── lib/                # External library configurations (e.g., Supabase client, Stripe client)
├── styles/             # Global CSS, Tailwind CSS configuration
└── types/              # Global TypeScript type definitions
```

**MUST Follow:**
*   **Single Responsibility Principle (SRP)**: Each file, component, or module MUST have one clear, well-defined responsibility.
    *   **Rationale**: Improves maintainability, testability, and reduces cognitive load.
*   **Co-location**: Related files (e.g., a component, its hooks, types, and services) MUST be placed together within their respective domain folder.
    *   **Rationale**: Enhances discoverability and reduces mental overhead when working on a specific feature.

### Import/Dependency Management

**MUST Follow:**
*   **Absolute Imports for `src/`**: Use absolute imports starting from the `/src` directory for all internal modules.
    ```typescript
    // MUST: Use absolute imports for clarity and refactoring ease
    import { ProductCard } from '@/domains/products/components/ProductCard';
    import { supabase } from '@/lib/supabase';
    ```
    *   **Rationale**: Makes imports cleaner, less prone to errors during refactoring, and easier to understand the origin of a module.
*   **Relative Imports for Siblings/Children**: Use relative imports for files within the same directory or immediate subdirectories.
    ```typescript
    // MUST: Use relative imports for siblings/children
    // In src/domains/products/components/ProductList.tsx
    import { ProductCard } from './ProductCard';
    ```
    *   **Rationale**: Indicates local dependencies and reduces boilerplate for closely related files.
*   **Grouped Imports**: Imports MUST be grouped in the following order:
    1.  Node.js built-in modules
    2.  External libraries (e.g., `react`, `next`, `swr`)
    3.  Absolute internal modules (`@/`)
    4.  Relative internal modules (`./`, `../`)
    5.  Type imports (separately, if not inline)
    ```typescript
    // MUST: Grouped imports
    import path from 'path'; // 1. Node.js built-ins
    import React from 'react'; // 2. External libraries
    import { useProductDetails } from '@/domains/products/hooks/useProductDetails'; // 3. Absolute internal
    import { ProductCardProps } from './ProductCard'; // 4. Relative internal
    ```
    *   **Rationale**: Enhances readability and consistency.

### Error Handling Patterns

**MUST Follow:**
*   **Centralized Error Boundaries for UI**: Use React Error Boundaries to catch JavaScript errors in the component tree and display fallback UI.
    ```typescript
    // MUST: Use an Error Boundary for UI resilience
    // src/app/layout.tsx or a higher-level component
    import ErrorBoundary from '@/components/ErrorBoundary';

    <ErrorBoundary>
      <YourAppContent />
    </ErrorBoundary>
    ```
    *   **Rationale**: Prevents entire application crashes and provides a graceful user experience.
*   **`try-catch` for Asynchronous Operations**: All asynchronous operations (API calls, Supabase interactions) MUST be wrapped in `try-catch` blocks.
    ```typescript
    // MUST: try-catch for async operations
    async function fetchProduct(id: string) {
      try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        if (error) throw error;
        return data;
      } catch (error) {
        console.error('Failed to fetch product:', error);
        // Re-throw or return a structured error for higher-level handling
        throw new Error(`Product fetch failed: ${error.message}`);
      }
    }
    ```
    *   **Rationale**: Ensures robust error handling, prevents unhandled promise rejections, and allows for specific error recovery.
*   **Custom Error Classes**: Define custom error classes for specific application errors (e.g., `AuthError`, `PaymentError`).
    ```typescript
    // MUST: Use custom error classes for specific error types
    class ProductNotFoundError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'ProductNotFoundError';
      }
    }

    // Usage:
    if (!data) throw new ProductNotFoundError(`Product with ID ${id} not found.`);
    ```
    *   **Rationale**: Provides more semantic error handling and allows for easier programmatic identification and handling of error types.
*   **Logging**: Use a consistent logging strategy (e.g., `console.error`, or a dedicated logging service in production) for all caught errors.
    *   **Rationale**: Essential for debugging, monitoring, and identifying issues in production.

## 4. Code Style Rules

### MUST Follow:

*   **TypeScript Strictness**: Enable and adhere to strict TypeScript rules. Avoid `any` type unless explicitly justified for external library compatibility.
    *   **Rationale**: Maximizes type safety, reduces runtime errors, and improves code readability and maintainability.
*   **Meaningful Naming**: Use descriptive names for variables, functions, components, and files.
    ```typescript
    // MUST: Meaningful names
    const userProfileData = ...;
    function calculateTotalPrice(items: Item[]): number { ... }
    // MUST NOT: Ambiguous names
    const data = ...;
    function calc(a: number[]): number { ... }
    ```
    *   **Rationale**: Improves code readability and understanding without needing to dive into implementation details.
*   **Consistent Formatting**: Adhere to ESLint and Prettier configurations. Set up pre-commit hooks to enforce formatting.
    *   **Rationale**: Ensures consistent code style across the team, reducing merge conflicts and improving readability.
*   **Functional Components & Hooks**: All React components MUST be functional components using React Hooks for state and side effects.
    *   **Rationale**: Modern React paradigm, promotes reusability of logic, and improves performance.
*   **`const` over `let`**: Prefer `const` for variable declarations unless the variable needs to be reassigned. Avoid `var`.
    *   **Rationale**: Promotes immutability, reduces side effects, and makes code easier to reason about.
*   **Immutability**: Avoid direct mutation of objects and arrays. Use spread syntax (`...`), `map`, `filter`, `reduce` for updates.
    ```typescript
    // MUST: Immutable update
    const updatedUser = { ...user, name: 'New Name' };
    const newItems = [...items, newItem];

    // MUST NOT: Mutable update
    user.name = 'New Name'; // Direct mutation
    items.push(newItem);    // Direct mutation
    ```
    *   **Rationale**: Prevents unexpected side effects, simplifies debugging, and aligns with React's rendering model.
*   **ES Modules (ESM)**: Use `import` and `export` syntax exclusively.
    *   **Rationale**: Standard for modern JavaScript, enables static analysis and tree-shaking.
*   **Early Returns**: Use early returns to reduce nesting and improve readability for conditional logic.
    ```typescript
    // MUST: Early return
    function getUser(id: string) {
      if (!id) {
        return null;
      }
      // ... rest of the logic
    }
    ```
    *   **Rationale**: Makes control flow clearer and reduces cognitive load.

### MUST NOT Do:

*   **Huge, Multi-Responsibility Modules in Single File**: Do NOT create monolithic files or components that handle multiple unrelated concerns.
    *   **Rationale**: Violates SRP, makes files hard to read, test, and maintain.
*   **Define Complex Global State Management Patterns (e.g., Redux)**: Do NOT introduce complex state management libraries like Redux or Zustand for MVP.
    *   **Rationale**: Supabase + SWR/React Query effectively handles server state, and `useState`/`useReducer`/Context API suffice for local/global UI state. Over-engineering adds unnecessary complexity.
*   **Direct DOM Manipulation**: Do NOT directly manipulate the DOM using `document.querySelector` or similar methods in React components.
    *   **Rationale**: Bypasses React's reconciliation process, leading to unpredictable UI behavior and performance issues. Use `useRef` and React's lifecycle for DOM interactions when absolutely necessary.
*   **Magic Strings/Numbers**: Do NOT use hardcoded strings or numbers directly in the code without clear meaning. Define them as constants or enums.
    ```typescript
    // MUST NOT: Magic number
    if (user.role === 1) { ... }

    // MUST: Use constant/enum
    enum UserRole { ADMIN = 1, PLANNER = 2 }
    if (user.role === UserRole.ADMIN) { ... }
    ```
    *   **Rationale**: Improves readability, maintainability, and reduces errors from typos.
*   **Deeply Nested Components/Logic**: Do NOT create deeply nested component trees or excessively nested conditional logic.
    *   **Rationale**: Reduces readability and makes code harder to debug and test. Refactor into smaller components or use early returns.

## 5. Architecture Patterns

### Component/Module Structure Guidelines

*   **Smart vs. Dumb Components (Container/Presentational)**: While not a strict rule, aim to separate logic (fetching data, state management) from presentation (rendering UI).
    *   **Container Components (Smart)**: Live in `domains/[domain_name]/components/` or `app/`. Responsible for data fetching, state, and passing props to presentational components.
    *   **Presentational Components (Dumb)**: Live in `components/ui/` or `domains/[domain_name]/components/`. Receive data via props and render UI. Have no knowledge of data sources or business logic.
*   **Hooks for Reusable Logic**: Extract reusable logic into custom React Hooks (e.g., `useAuth`, `useProducts`) and place them in `domains/[domain_name]/hooks/`.
    *   **Rationale**: Promotes logic reusability and keeps components clean.

### Data Flow Patterns

*   **Unidirectional Data Flow**: Data flows in a single direction (parent to child components via props).
    *   **Rationale**: Predictable state management, easier debugging.
*   **Client-Side Data Fetching with SWR/React Query**:
    *   **MUST**: Use SWR or React Query for fetching, caching, and revalidating server data from Supabase.
    ```typescript
    // MUST: Use SWR for client-side data fetching
    // src/domains/products/hooks/useProducts.ts
    import useSWR from 'swr';
    import { supabase } from '@/lib/supabase';
    import { Product } from '@/types/product';

    const fetcher = async (url: string) => {
      const { data, error } = await supabase.from(url).select('*');
      if (error) throw error;
      return data;
    };

    export function useProducts() {
      return useSWR<Product[]>('products', fetcher);
    }
    ```
    *   **Rationale**: Provides automatic caching, revalidation, error retry, and simplifies data synchronization with the UI.
*   **Next.js API Routes for Sensitive Operations**:
    *   **MUST**: Use Next.js API Routes (`/src/app/api/...`) for any operations requiring server-side secrets (e.g., Stripe API keys) or complex business logic that cannot be exposed directly to the client via RLS.
    ```typescript
    // MUST: Next.js API Route for Stripe session creation
    // src/app/api/stripe/checkout/route.ts
    import { NextResponse } from 'next/server';
    import Stripe from 'stripe';

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

    export async function POST(request: Request) {
      try {
        const { items } = await request.json(); // Input validation is crucial here
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: items.map(item => ({ price: item.priceId, quantity: item.quantity })),
          mode: 'payment',
          success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${request.headers.get('origin')}/cancel`,
        });
        return NextResponse.json({ sessionId: session.id });
      } catch (error) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    ```
    *   **Rationale**: Protects sensitive API keys and allows for secure server-side logic execution.
*   **Supabase Edge Functions for Specific Serverless Logic**:
    *   **MAY**: Consider Supabase Edge Functions for specific, isolated serverless logic (e.g., webhook handling, complex data transformations) that benefits from being closer to the database or requires specific Supabase integrations.
    *   **Rationale**: Offers low latency and tight integration with Supabase services.

### State Management Conventions

*   **Local Component State**: Use `useState` and `useReducer` for managing state local to a component.
*   **Server State (via SWR/React Query)**: Treat all data fetched from Supabase as server state. SWR/React Query handles its caching, revalidation, and synchronization.
    *   **Rationale**: Avoids duplicating server state in client-side global stores, simplifying state management.
*   **Context API for Global UI State**: Use React Context API for genuinely global UI state that needs to be accessed by many components (e.g., user authentication status, theme preferences).
    ```typescript
    // MUST: Use Context for global UI state like Auth status
    // src/contexts/AuthContext.tsx
    import React, { createContext, useContext, useState, useEffect } from 'react';
    import { supabase } from '@/lib/supabase';
    import { User } from '@supabase/supabase-js';

    interface AuthContextType {
      user: User | null;
      loading: boolean;
      // ... login/logout functions
    }

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [user, setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        });
        return () => subscription.unsubscribe();
      }, []);

      return (
        <AuthContext.Provider value={{ user, loading }}>
          {children}
        </AuthContext.Provider>
      );
    };

    export const useAuth = () => {
      const context = useContext(AuthContext);
      if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
    };
    ```
    *   **Rationale**: Provides a clean way to share state without prop drilling for cross-cutting concerns.

### API Design Standards (Next.js API Routes & Supabase)

*   **RESTful Principles**: Next.js API Routes MUST adhere to RESTful principles:
    *   Use appropriate HTTP methods (GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for deletion).
    *   Use clear, noun-based URLs (e.g., `/api/products`, `/api/users/[id]`).
    *   Return standard HTTP status codes (200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error).
*   **Input Validation**: All API routes MUST validate incoming request bodies and query parameters.
    *   **Rationale**: Prevents malformed data, security vulnerabilities (e.g., SQL injection), and ensures data integrity. Use a validation library like Zod or Yup.
*   **Error Responses**: API routes MUST return consistent JSON error responses on failure, including a clear error message and potentially an error code.
    ```json
    // MUST: Consistent error response format
    {
      "error": "Invalid input data",
      "code": "BAD_REQUEST",
      "details": {
        "email": "Email is required"
      }
    }
    ```
    *   **Rationale**: Facilitates error handling on the client-side and provides clear debugging information.
*   **Supabase Row Level Security (RLS)**:
    *   **MUST**: Define comprehensive RLS policies on all Supabase tables to enforce access control based on user roles and ownership.
    *   **Rationale**: This is the primary security mechanism for data access from the client. It prevents unauthorized data exposure and modification.
*   **Supabase PostgreSQL Functions**:
    *   **MAY**: Use PostgreSQL functions (stored procedures) within Supabase for complex, transactional logic or to encapsulate database-specific operations that require elevated privileges or multiple steps.
    *   **Rationale**: Improves performance by reducing network round trips and ensures atomicity for multi-step operations.