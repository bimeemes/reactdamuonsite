# Code Quality Standards for React Damuon Site

## Overview

This project now follows industry-standard code quality practices equivalent to what MISRA C provides for C programming, but tailored for JavaScript/React development.

## Tools Configured

### 1. ESLint (Comprehensive Linting)

- **React-specific rules**: Proper JSX usage, hooks rules, component best practices
- **JavaScript best practices**: No unused variables, prefer const, arrow functions
- **Security rules**: Detects potential security vulnerabilities
- **Accessibility rules**: Ensures WCAG compliance and accessible components
- **Import/Export rules**: Proper module organization and dependency management

### 2. Prettier (Code Formatting)

- Consistent code formatting across all files
- Automatic fixing of style issues
- Enforces single quotes, semicolons, proper indentation

### 3. JSDoc (Documentation Standards)

- Structured documentation for functions and components
- Type annotations and parameter documentation
- Automatic documentation generation

### 4. Security Linting

- Detects unsafe patterns like eval(), buffer overflows
- Identifies potential injection vulnerabilities
- Warns about timing attacks and unsafe regex

## Available Scripts

### Linting

```bash
npm run lint                 # Check all files for linting issues
npm run lint:fix            # Automatically fix linting issues where possible
npm run lint:security       # Focus on security-related linting
```

### Formatting

```bash
npm run format              # Format all files with Prettier
npm run format:check        # Check if files are properly formatted
```

### Documentation

```bash
npm run docs                # Generate JSDoc documentation
```

### Combined Quality Checks

```bash
npm run code-quality        # Run both linting and format checking
npm run code-fix            # Fix both linting and formatting issues
```

## Code Quality Rules Enforced

### JavaScript Standards

- ✅ No unused variables
- ✅ Prefer const over let/var
- ✅ Use arrow functions where appropriate
- ✅ No console.log in production (warnings only)
- ✅ Strict equality checks (===)
- ✅ No unreachable code
- ✅ Consistent return statements

### React Standards

- ✅ Proper hook usage and dependencies
- ✅ JSX key props for lists
- ✅ No deprecated React patterns
- ✅ Component naming conventions
- ✅ Proper prop validation
- ✅ Self-closing tags where appropriate

### Security Standards

- ✅ No eval() usage
- ✅ Safe buffer operations
- ✅ Proper input validation patterns
- ✅ No unsafe regex patterns
- ✅ CSRF protection awareness

### Accessibility Standards

- ✅ Alt text for images
- ✅ Proper ARIA attributes
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Semantic HTML usage

## Benefits (Similar to MISRA C for automotive)

1. **Reliability**: Catches common programming errors before they reach production
2. **Maintainability**: Consistent code style makes the codebase easier to maintain
3. **Security**: Identifies potential security vulnerabilities early
4. **Performance**: Encourages efficient coding patterns
5. **Accessibility**: Ensures the application is usable by everyone
6. **Team Collaboration**: Standardized code style reduces merge conflicts

## Integration with Development Workflow

1. **Pre-commit Hooks**: Consider adding Husky to run quality checks before commits
2. **CI/CD Integration**: Run quality checks in your build pipeline
3. **Editor Integration**: Configure VS Code to show linting errors in real-time
4. **Code Reviews**: Use quality metrics as part of review process

## Next Steps

1. Run `npm run code-quality` to see current quality status
2. Fix any existing issues with `npm run code-fix`
3. Consider adding type checking with TypeScript for even stricter quality control
4. Set up pre-commit hooks for automated quality enforcement

This setup provides the same level of code quality assurance that MISRA C provides for safety-critical automotive systems, but adapted for modern web development with React and JavaScript.
