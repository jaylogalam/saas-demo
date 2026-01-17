---
description: Guidelines for implementing new features
---

# New Feature Implementation Guidelines

## Tech Stack

- **Frontend**: Vite + React + TypeScript
- **Backend & Database**: Supabase (Auth, Database, Edge Functions, Storage)
- **Payments**: Stripe (with Stripe Sync Engine for automatic syncing to Supabase)

Follow these principles when implementing any new feature:

## Code Quality Standards

1. **Clean & Simple** - Write readable, maintainable code with clear intent
2. **Professional** - Follow consistent naming conventions and formatting
3. **Modern Approach** - Use latest React patterns (hooks, functional components, etc.)

## Component Architecture

1. **Reuse First** - Check for existing components before creating new ones
2. **Create Reusable Components** - When multiple new components share logic/UI:
   - Extract shared logic into custom hooks (`src/hooks/`)
   - Extract shared UI into reusable components (`src/components/ui/`)
3. **Composition over Duplication** - Prefer composing smaller components

## SOLID Principles (Applied Pragmatically)

Apply when beneficial, avoid over-engineering:

- **S**ingle Responsibility - Each component/hook does one thing well
- **O**pen/Closed - Components extensible via props, not modification
- **L**iskov Substitution - Maintain consistent component interfaces
- **I**nterface Segregation - Keep prop interfaces focused and minimal
- **D**ependency Inversion - Inject dependencies (e.g., API calls via hooks)

## Implementation Checklist

- [ ] Check existing components/hooks for reusability
- [ ] Use TypeScript with proper types
- [ ] Follow project's existing patterns and conventions but improve if possible
- [ ] Keep components focused and composable
- [ ] Extract shared logic only when there's actual duplication

## When Unsure

- Ask clarifying questions before proceeding
- Don't make assumptions about requirements or implementation details
