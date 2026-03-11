# AGENTS.md - Developer Guidelines

This document provides guidelines for AI agents working in this codebase.

## Project Overview

- **Project Name**: Recuerdame
- **Type**: Next.js 16 Web Application with React 19
- **Stack**: TypeScript, Tailwind CSS v4, ESLint

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint on all files |

### Running Single Test

No test framework is currently configured. To add tests, install Vitest or Jest:
- Vitest: `npm install -D vitest @vitejs/plugin-react`
- Jest: `npm install -D jest @types/jest ts-jest`

## Code Style Guidelines

### TypeScript

- **Strict Mode**: Enabled in `tsconfig.json`
- **JSX Transform**: `react-jsx`
- **Module Resolution**: `bundler`
- **Path Aliases**: Use `@/*` instead of relative paths (e.g., `@/components/Button`)
- **Type Annotations**: Always provide explicit types for function parameters and return types
- **Avoid `any`**: Use `unknown` when type is truly unknown

### React/Next.js Patterns

- Use Server Components by default (no "use client" directive unless needed)
- Use the App Router (`app/` directory)
- Place layouts in `app/layout.tsx`
- Use `next/image` for images (always include `alt` prop)
- Use `next/font` for fonts
- Use Tailwind CSS utility classes for styling

### Imports

```typescript
// Group imports in this order:
import type { Metadata } from "next";      // Type imports first
import { useState, useEffect } from "react"; // Named imports
import Image from "next/image";             // Next.js imports
import "./globals.css";                     // CSS imports last
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Files**: kebab-case for utilities (e.g., `date-utils.ts`), PascalCase for components
- **Variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Interfaces**: PascalCase with "I" prefix optional (prefer descriptive names: `UserData` not `IUser`)

### Formatting

- Use 2 spaces for indentation
- No semicolons at end of statements
- Use double quotes for strings
- Trailing commas in multiline objects/arrays
- Max line length: 80 characters (soft limit)

### Error Handling

- Use TypeScript types to prevent runtime errors
- Never use `// @ts-ignore` or `any` to bypass type checking
- Handle async operations with proper error states
- Use Next.js error boundaries for component-level error handling

### CSS/Tailwind

- Use Tailwind utility classes instead of custom CSS
- Use `dark:` prefix for dark mode variants
- Use Tailwind's color palette (zinc, slate, etc.)
- Prefer flexbox and grid over positioning
- Use semantic class names when possible

### ESLint Configuration

- Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`
- Run `npm run lint` before committing

### File Organization

```
app/
  layout.tsx        # Root layout
  page.tsx          # Home page
  globals.css       # Global styles
  [slug]/           # Dynamic routes
components/
  ui/               # Reusable UI components
lib/                # Utility functions
types/              # Shared TypeScript types
```

### Best Practices

1. **Server vs Client Components**: Default to Server Components; add "use client" only when hooks (useState, useEffect) are needed
2. **Images**: Always use next/image with proper sizing and alt text
3. **Fonts**: Use next/font for optimal performance
4. **Metadata**: Export metadata from page/layout files for SEO
5. **Environment Variables**: Use `.env.local` for local development, never commit secrets
6. **Performance**: Use React Server Components to reduce client bundle size
