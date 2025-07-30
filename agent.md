# Ampcode Agent Configuration

## Project Overview
Ampcode is a modern web application focused on delivering high-performance, scalable solutions with an emphasis on clean code and developer experience.

## Core Principles
- **Performance First**: Optimize for speed and efficiency
- **Clean Architecture**: Follow SOLID principles and maintain separation of concerns
- **Type Safety**: Leverage TypeScript for robust type checking
- **Modern Stack**: Use cutting-edge tools and frameworks
- **Accessibility**: Ensure WCAG compliance and inclusive design

## Technical Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context / Zustand (when needed)
- **Animation**: Framer Motion
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel / AWS

## Coding Standards

### General Guidelines
1. Write self-documenting code with clear variable and function names
2. Keep functions small and focused on a single responsibility
3. Use early returns to reduce nesting
4. Prefer composition over inheritance
5. Always handle errors gracefully

### TypeScript
- Use strict mode
- Define explicit types for function parameters and return values
- Avoid `any` type unless absolutely necessary
- Use interfaces for object shapes, types for unions/primitives
- Leverage utility types (Partial, Required, Pick, Omit)

### React/Next.js
- Use functional components with hooks
- Implement proper error boundaries
- Optimize with React.memo, useMemo, and useCallback when needed
- Follow Next.js best practices for SSR/SSG/ISR
- Use dynamic imports for code splitting

### Styling
- Mobile-first responsive design
- Use Tailwind utility classes
- Create custom components for repeated patterns
- Maintain consistent spacing and typography scale
- Support dark mode

### File Structure
```
src/
├── app/              # Next.js app directory
├── components/       # Reusable components
│   ├── ui/          # Generic UI components
│   └── features/    # Feature-specific components
├── lib/             # Utility functions and helpers
├── hooks/           # Custom React hooks
├── types/           # TypeScript type definitions
└── styles/          # Global styles and Tailwind config
```

## Development Workflow

### Before Starting
1. Understand the requirements fully
2. Break down complex tasks into smaller steps
3. Consider edge cases and error scenarios
4. Plan the component/feature architecture

### While Coding
1. Write tests alongside implementation
2. Use meaningful commit messages
3. Keep console clean (no logs in production)
4. Document complex logic with comments
5. Regularly refactor to maintain code quality

### Code Review Checklist
- [ ] Types are properly defined
- [ ] No console.logs or debugger statements
- [ ] Error handling is implemented
- [ ] Code follows project conventions
- [ ] Performance implications considered
- [ ] Accessibility requirements met
- [ ] Responsive design tested

## Common Patterns

### API Integration
```typescript
// Use async/await with proper error handling
try {
  const data = await fetchAPI('/endpoint');
  return { success: true, data };
} catch (error) {
  return { success: false, error: error.message };
}
```

### Component Structure
```typescript
interface ComponentProps {
  // Define all props with descriptions
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Hooks at the top
  // Event handlers
  // Render logic
}
```

### Custom Hooks
```typescript
function useCustomHook() {
  // Encapsulate complex logic
  // Return consistent API
  return { data, loading, error };
}
```

## Performance Guidelines
- Lazy load images and components
- Minimize bundle size with tree shaking
- Use proper caching strategies
- Optimize database queries
- Implement proper loading states
- Monitor Core Web Vitals

## Security Best Practices
- Sanitize user inputs
- Use environment variables for secrets
- Implement proper authentication/authorization
- Follow OWASP guidelines
- Regular dependency updates
- Content Security Policy headers

## AI Assistant Instructions
When working on this project:
1. Always consider the broader architecture impact
2. Suggest improvements when you spot opportunities
3. Explain complex implementations clearly
4. Prioritize maintainability over cleverness
5. Ask for clarification when requirements are ambiguous
6. Provide multiple solutions when trade-offs exist
7. Include relevant documentation links
8. Test edge cases thoroughly

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Patterns](https://reactpatterns.com/)
- [Web.dev Performance](https://web.dev/performance/)

---

*This configuration helps AI assistants understand the project context and maintain consistency with the codebase standards.* 