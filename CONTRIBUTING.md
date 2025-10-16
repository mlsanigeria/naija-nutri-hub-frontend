# Contributing to Naija Nutri Hub Frontend

Thank you for your interest in contributing to **Naija Nutri Hub Frontend**! Your contributions help make this project better for everyone. This guide will walk you through everything you need to know to contribute effectively.

## Table of Contents

1. [About the Project](#about-the-project)
2. [Code of Conduct](#code-of-conduct)
3. [Getting Help](#getting-help)
4. [Ways to Contribute](#ways-to-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Features](#suggesting-features)
   - [Contributing Code](#contributing-code)
   - [Improving Documentation](#improving-documentation)
5. [Development Setup](#development-setup)
6. [Development Workflow](#development-workflow)
7. [Coding Standards](#coding-standards)
8. [Git Workflow](#git-workflow)
9. [Pull Request Process](#pull-request-process)
10. [License](#license)


## About the Project

**Naija Nutri Hub** is an AI-powered food platform focused on Nigerian cuisine that allows users to:
- Take or upload photos of meals and receive instant food classification
- Get nutritional estimates and calorie information for Nigerian dishes
- Access recipe suggestions with step-by-step cooking instructions
- Discover nearby restaurants that serve similar dishes

### Technology Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4 with CSS Variables
- **Component Library**: shadcn/ui with Radix UI primitives
- **Form Handling**: React Hook Form 7 with Zod validation
- **HTTP Client**: Axios 1.12.2
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Development**: ESLint, TypeScript strict mode


## Code of Conduct

This project adheres to the **Naija Nutri Hub Code of Conduct**. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

- **[CODE_OF_CONDUCT](CODE_OF_CONDUCT.md)**

## Getting Help

Before opening an issue, please use these channels for questions:

1. **GitHub Discussions** - Start a discussion on our GitHub Discussions page
2. **WhatsApp Communities** - Ask in any of the [WHATSAPP_COMMUNITIES](WHATSAPP_COMMUNITIES.md)

## Ways to Contribute

### Reporting Bugs

Help us improve by reporting bugs you encounter.

**Before Reporting:**
1. Search the [GitHub Issues page](https://github.com/mlsanigeria/naija-nutri-hub-frontend/issues) to see if the bug has already been reported
2. Ensure you're using the latest version of the project

**To Report a Bug:**
1. Open a new issue using the **"Bug Report"** template
2. Include the following information:
   - Version of Naija Nutri Hub Frontend you're using
   - Operating system and browser
   - Expected behavior vs. actual behavior
   - Steps to reproduce the issue
   - Error messages (if any)
   - Screenshots or code snippets (if applicable)

### Suggesting Features

We welcome feature suggestions!

**For Small Features/Improvements:**
- Open a new issue using the **"Feature Request"** template
- Clearly describe the feature and explain why it would be useful

**For Large, Complex Features:**
- Start a **GitHub Discussion** first to get feedback from the community
- Explain the problem it solves and the proposed solution

### Contributing Code

Ready to contribute code? Follow our [Development Workflow](#development-workflow) below.

### Improving Documentation

Documentation contributions are highly valued! Follow the same process as code contributions.

## Development Setup

### Prerequisites

Before you begin, ensure you have:
- **Node.js**: Version 18.17 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Git**: Latest version
- **Code Editor**: VS Code (recommended) with TypeScript and Tailwind CSS extensions

### Installation Steps

1. **Fork the repository** on GitHub

2. **Clone your fork locally:**
```bash
   git clone https://github.com/YOUR_USERNAME/naija-nutri-hub-frontend.git
   cd naija-nutri-hub-frontend
```

3. **Install dependencies:**
```bash
   npm install
```

4. **Start the development server:**
```bash
   npm run dev
```
   The application will be available at `http://localhost:3000`

5. **Verify your setup:**
   - Open your browser and navigate to `http://localhost:3000`
   - Check that the application loads without errors
   - Run the linter: `npm run lint`

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run format` - Format code using Prettier
- `npm run check-format` - Check if code is properly formatted
- `npm run prepare` - Set up Husky git hooks


## Development Workflow

### 1. Create a Feature Branch

Create a new branch for your work using descriptive naming:
```bash
# For bug fixes
git checkout -b fix/describe-the-bug

# For new features
git checkout -b feature/describe-the-feature

# For documentation updates
git checkout -b docs/describe-the-update

# For refactoring
git checkout -b refactor/describe-the-refactor
```

**Branch Naming Convention:**
- Use lowercase letters and hyphens
- Start with the type of change: `fix/`, `feature/`, `docs/`, `refactor/`
- Be descriptive but concise

### 2. Make Your Changes

- Follow the [Coding Standards](#coding-standards) below
- Keep changes focused on a single issue or feature
- Write clear, self-documenting code
- Add comments for complex logic

### 3. Test Your Changes

- Test manually in your browser
- Test on different screen sizes (responsive design)
- Test in multiple browsers (Chrome, Firefox, Safari)
- Ensure accessibility (keyboard navigation, screen readers)

### 4. Run Quality Checks

Before committing, run these commands:
```bash
# Format your code
npm run format

# Check for linting issues
npm run lint

# Ensure build passes
npm run build
```

### 5. Commit Your Changes

Use **Conventional Commits** format:
```bash
# Format: type(scope): description
git commit -m "feat(auth): add login form validation"
git commit -m "fix(ui): resolve button padding issue"
git commit -m "docs(readme): update installation instructions"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 6. Push Your Changes
```bash
git push origin your-branch-name
```


## Coding Standards

### TypeScript Guidelines

- **Use TypeScript** for all new files and components
- **Enable strict mode** - all TypeScript strict checks are enabled
- **Define proper types** for all props, state, and function parameters
- **Use interfaces** for object shapes and type definitions
- **Prefer `const` and `let`** over `var`
- **Implement proper error handling** with try-catch blocks

**Example:**
```tsx
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

const fetchUserProfile = async (userId: string): Promise<UserProfile> => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};
```

### React Component Guidelines

- **Use functional components** with hooks (no class components)
- **Follow this component structure:**
```tsx
  // 1. Imports
  import React from 'react'
  import { ComponentProps } from './types'
  
  // 2. Component definition
  export function ComponentName({ prop1, prop2 }: ComponentProps) {
    // 3. Hooks
    const [state, setState] = useState()
    
    // 4. Event handlers
    const handleClick = () => {}
    
    // 5. Render
    return <div>...</div>
  }
```
- **Use proper prop destructuring** and type definitions
- **Implement proper key props** for list items
- **Use React.memo()** for performance optimization when needed

### File & Folder Structure

- **Use PascalCase** for component files: `UserProfile.tsx`
- **Use camelCase** for utility files: `apiHelpers.ts`
- **Use kebab-case** for page files: `user-profile/page.tsx`
- **Organize components** in feature-based folders under `src/components/features/`
- **Keep UI components** in `src/components/ui/` (shadcn/ui components)

### Styling Guidelines

- **Use Tailwind utility classes** instead of custom CSS when possible
- **Follow the design system** defined in `src/app/globals.css`
- **Use CSS variables** for consistent theming
- **Design mobile-first** with responsive classes
- **Use semantic color names** from the design system

### Form Handling

- **Use React Hook Form** for all form implementations
- **Implement Zod validation** for form schemas
- **Provide proper error messages** and validation feedback
- **Use controlled components** for form inputs

### API Integration

- **Use Axios** for HTTP requests (configured in `src/lib/axios.ts`)
- **Implement proper error handling** for API calls
- **Use TypeScript interfaces** for API response types
- **Follow RESTful conventions** for API endpoints

### Performance Guidelines

- **Use Next.js Image component** for optimized images
- **Implement proper loading states** for async operations
- **Use dynamic imports** for code splitting when appropriate
- **Optimize bundle size** by avoiding unnecessary dependencies

### Code Quality Best Practices

**Minimize ESLint Warnings:**

All ESLint warnings should be addressed except when strictly necessary. Here's how:

**✅ Remove Unused Variables:**
```tsx
// ❌ Bad
const [data, setData] = useState(null);
const unusedVar = 'not used';

// ✅ Good
const [data, setData] = useState(null);
```

**✅ Include All Dependencies:**
```tsx
// ❌ Bad
useEffect(() => {
  fetchData(userId);
}, []); // userId missing

// ✅ Good
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

**✅ Remove Console Statements:**
```tsx
// ❌ Bad
console.log('Debug info:', data);

// ✅ Good - Use conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

**✅ Remove Unused Imports:**
```tsx
// ❌ Bad
import { useState, useEffect } from 'react';
// useEffect not used

// ✅ Good
import { useState } from 'react';
```

**✅ Avoid Any Types:**
```tsx
// ❌ Bad
const data: any = fetchData();

// ✅ Good
interface DataType {
  id: string;
  name: string;
}
const data: DataType = fetchData();
```

### Component Update Guidelines

When updating existing components, **always make new props optional** to prevent breaking changes:
```tsx
// ❌ Bad - Breaking change
interface ButtonProps {
  variant: 'primary' | 'secondary';
  newProp: string; // Required prop breaks existing usage
}

// ✅ Good - Backward compatible
interface ButtonProps {
  variant: 'primary' | 'secondary';
  newProp?: string; // Optional with default
}

export function Button({ variant, newProp = 'default' }: ButtonProps) {
  // Component implementation
}
```

---

## Git Workflow

### Git Hooks (Husky)

This project uses **Husky** to enforce code quality through automated git hooks.

#### Pre-commit Hook

Runs automatically when you commit and checks:

1. **Code Formatting (Prettier)**
```bash
   npm run check-format
```
   - If fails: Run `npm run format` to auto-format your code

2. **Code Quality (ESLint)**
```bash
   npm run lint
```
   - If fails: Address all ESLint errors and warnings

#### Pre-push Hook

Runs automatically when you push and checks:

1. **Build Success**
```bash
   npm run build
```
   - If fails: Resolve all build errors before pushing

### Manual Quality Checks

Before committing, always run:
```bash
# 1. Format your code
npm run format

# 2. Check for linting issues
npm run lint

# 3. Ensure build passes
npm run build

# 4. Stage and commit
git add .
git commit -m "feat: your commit message"
```

### Common Issues and Solutions

**Formatting Issues:**
```bash
npm run format
git add .
git commit -m "style: format code"
```

**ESLint Warnings:**
- **Unused variables**: Remove or use the variable
- **Missing dependencies**: Add to useEffect dependency array
- **Console.log statements**: Remove or replace with proper logging

**Build Failures:**
- Check for TypeScript errors
- Ensure all imports are correct
- Verify component props and types
- Check for missing dependencies


## Pull Request Process

### Before Creating a PR

Complete this checklist:

#### Code Quality
- [ ] Code is formatted (`npm run format`)
- [ ] No linting errors (`npm run lint`)
- [ ] ESLint warnings minimized
- [ ] Build successful (`npm run build`)
- [ ] TypeScript errors resolved
- [ ] No console.log statements
- [ ] Unused imports removed
- [ ] Code follows style guide

#### Git & Branch Management
- [ ] Branch is up to date with main
- [ ] No merge conflicts
- [ ] Clean commit history
- [ ] Focused changes (one feature/fix per PR)

#### Testing & Validation
- [ ] Manual testing completed
- [ ] Cross-browser testing done
- [ ] Mobile responsive
- [ ] Accessibility checked
- [ ] Performance verified

#### Documentation
- [ ] PR description complete
- [ ] Issue referenced
- [ ] Screenshots included (see below)
- [ ] Breaking changes documented (if any)

### Update Your Branch

Before creating the PR, ensure your branch is up to date:
```bash
# Update with latest main
git checkout main
git pull origin main
git checkout your-branch-name
git rebase main

# Final quality checks
npm run format
npm run lint
npm run build

# Push your changes
git push origin your-branch-name
```

### Creating the Pull Request

1. **Open a Pull Request** against the `main` branch on GitHub

2. **Fill out the PR template** with:
   - **Description**: What changes were made and why
   - **Type of Change**: Bug fix, feature, documentation, etc.
   - **Testing**: How the changes were tested
   - **Screenshots**: Required screenshots (see below)
   - **Checklist**: Confirm all requirements are met

3. **Reference the related issue:**
```
   Fixes #123
   Closes #456
   Related to #789
```

### Required Screenshots

For UI/UX changes, include these **three screenshots**:

#### 1. Figma Design Screenshot
- Screenshot from the [Figma design](https://www.figma.com/design/JD4yFts6kF1mLQzictb2F4/hactober-fest?node-id=0-1)
- Shows the intended design and layout
- Include design specifications or annotations

**Example:**
![Figma Design Example](./public/images/figma.png)
*A screenshot showing the Figma design for the component/page being implemented*

#### 2. Local Development Screenshot
- Screenshot of your implementation running locally
- Shows the actual rendered component/page
- Include browser developer tools if relevant

**Example:**
![Local Development Example](./public/images/localhost.png)
*A screenshot showing the actual implementation running on localhost*

#### 3. Husky Checks Passed Screenshot
- Terminal output showing successful pre-commit and pre-push hooks
- Shows:
  - ✅ Prettier formatting check passed
  - ✅ ESLint check passed
  - ✅ Build successful

**Example:**
![Husky Checks Example](./public/images/husky-check.png)
*A screenshot showing the actual husky check implementation*

**Terminal Output Example:**
```bash
$ git commit -m "feat: add new login form component"
🏗️👷  Have formatted the codebase? Checking styling, linting, and testing your project before committing.
✅ Prettier check passed
✅ ESLint check passed

$ git push origin feature/login-form
🤔🤔🤔🤔... We need to build your code before we push... 🤔🤔🤔🤔
✅ Build successful
```

### Screenshot Guidelines
- Use high-resolution, clear screenshots
- Show the complete component/page
- Use the same browser for consistency
- Include mobile view if applicable
- For bug fixes, show before/after states

### PR Review Process

1. **Automated Checks**: CI/CD pipeline will run tests and linting
2. **Code Review**: Maintainers will review for:
   - Code quality and style
   - Functionality and logic
   - Performance implications
   - Security considerations
   - Accessibility compliance

3. **Feedback and Iteration**: 
   - Address all review comments
   - Make requested changes
   - Respond to feedback professionally
   - Update the PR description if needed

4. **Approval and Merge**: Once approved, your PR will be merged

### PR Best Practices

- **Keep PRs focused** - One feature or bug fix per PR
- **Write descriptive titles** - Clear and concise
- **Provide context** - Explain the problem and solution
- **Include tests** - Demonstrate that changes work
- **Update documentation** - If changes affect user-facing features
- **Be responsive** - Address feedback promptly

> **Note on Major Changes:** For significant changes (API modifications, architectural changes, breaking changes), please open an issue first to discuss the approach and ensure community consensus.

## License

By contributing, you agree that your contributions will be licensed under the **MIT License**.

---

Thank you for contributing to Naija Nutri Hub Frontend! 🎉