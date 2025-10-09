## 🛠️ Contributing to NAIJA-NUTRI-HUB-FRONTEND

Thanks for taking the time to contribute! Your help is valuable and makes this project better for everyone.

This document outlines the comprehensive guidelines for contributing to **NAIJA-NUTRI-HUB-FRONTEND** - the frontend application for the Naija Nutri Hub project, an AI-powered food platform focused on Nigerian cuisine.

### 🍽️ About Naija Nutri Hub

**Naija Nutri Hub** is an end-to-end, AI-powered food platform that allows users to:
- **Take or upload photos** of meals and receive instant food classification
- **Get nutritional estimates** and calorie information for Nigerian dishes
- **Access recipe suggestions** with step-by-step cooking instructions
- **Discover nearby restaurants** that serve similar dishes

This frontend repository is built with modern web technologies and focuses on providing an intuitive, accessible user experience for Nigerian food enthusiasts.

### 🛠️ Technology Stack

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

-----

## Code of Conduct

This project and its community are governed by the **NAIJA-NUTRI-HUB-FRONTEND Code of Conduct** (or a standard like the Contributor Covenant). By participating, you are expected to uphold this code. Please report unacceptable behavior to us.

  * **[CODE\_OF\_CONDUCT](CODE\_OF\_CONDUCT.md)**

-----

## 💬 How to Ask Questions

If you have a question about how to use **NAIJA-NUTRI-HUB-FRONTEND** or want to discuss a potential feature, please use the following methods before opening an issue:

1.  **Start a discussion on our GitHub Discussions page**
2.  **Ask in any of the [WHATSAPP_COMMUNITIES](WHATSAPP_COMMUNITIES.md)**

-----

## 🐛 Reporting Bugs

A great bug report helps us fix the issue faster. Please follow these steps:

### Before Reporting
1.  **Check Existing Issues:** Search the **[GitHub Issues page](https://github.com/mlsanigeria/naija-nutri-hub-frontend/issues)** to see if the bug has already been reported.
2.  **Try the Latest Version:** Ensure you're using the latest version of the application.
3.  **Clear Browser Cache:** Try clearing your browser cache and cookies.
4.  **Check Browser Console:** Look for any JavaScript errors in the browser's developer console.

### Creating a Bug Report
1.  **Open a New Issue:** Choose the **"Bug Report"** template
2.  **Provide Detailed Information:**

#### Required Information
- **Environment Details:**
  - Operating System (Windows, macOS, Linux)
  - Browser and version (Chrome, Firefox, Safari, Edge)
  - Node.js version (if applicable)
  - Application version or commit hash

- **Bug Description:**
  - **Expected behavior:** What should happen?
  - **Actual behavior:** What actually happened?
  - **Error messages:** Include any error messages or console logs
  - **Screenshots/Videos:** Visual evidence of the issue

- **Reproduction Steps:**
  - Step-by-step instructions to reproduce the bug
  - Include specific data or inputs that trigger the issue
  - Note any specific conditions or prerequisites

- **Additional Context:**
  - Frequency of occurrence (always, sometimes, once)
  - Workarounds (if any)
  - Related issues or pull requests

#### Bug Report Template
```markdown
## Bug Description
Brief description of the bug

## Environment
- OS: [e.g., Windows 10, macOS 12.0, Ubuntu 20.04]
- Browser: [e.g., Chrome 95, Firefox 94, Safari 15]
- Node.js: [e.g., v18.17.0]
- Application Version: [e.g., commit abc123 or v1.2.3]

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Screenshots
If applicable, add screenshots to help explain your problem

## Console Logs
```
Paste any relevant console logs here
```

## Additional Context
Add any other context about the problem here
```

-----

## ✨ Suggesting Features

We welcome ideas for new features! To propose an enhancement:

### Before Suggesting
1.  **Check Existing Issues/Discussions:** Search for similar feature requests
2.  **Review Project Goals:** Ensure your feature aligns with the Naija Nutri Hub vision
3.  **Consider Implementation:** Think about the technical feasibility and effort required

### Creating a Feature Request
1.  **Choose the Right Channel:**
      * **Small improvements/bug fixes**: Open an issue with the **"Feature Request"** template
      * **Large, complex features**: Start a **GitHub Discussion** first for community feedback
      * **UI/UX improvements**: Reference the [Figma design](https://www.figma.com/design/JD4yFts6kF1mLQzictb2F4/hactober-fest?node-id=0-1)

2.  **Provide Comprehensive Information:**

#### Feature Request Template
```markdown
## Feature Description
Brief description of the proposed feature

## Problem Statement
What problem does this feature solve? Who would benefit from it?

## Proposed Solution
Describe your proposed solution in detail

## User Stories
- As a [user type], I want [goal] so that [benefit]
- As a [user type], I want [goal] so that [benefit]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Design Considerations
- UI/UX implications
- Technical considerations
- Performance impact
- Accessibility requirements

## Additional Context
Any other relevant information, mockups, or examples
```

3.  **Explain the "Why":** Focus on the problem being solved and user value
4.  **Consider Alternatives:** Are there existing solutions or workarounds?
5.  **Think About Implementation:** Provide any technical insights or considerations

### Feature Request Guidelines
- **Be specific** about the problem and solution
- **Include user stories** to clarify the use case
- **Consider the Nigerian food context** - how does this relate to local cuisine?
- **Think about accessibility** and mobile-first design
- **Provide mockups or examples** when possible
- **Be open to feedback** and alternative approaches

-----

## 💻 Making Code Contributions (Pull Requests)

Ready to dive into the code? Awesome\! To ensure a smooth process, please follow these guidelines:

### 1\. Development Environment Setup

#### Prerequisites
- **Node.js**: Version 18.17 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Git**: Latest version
- **Code Editor**: VS Code (recommended) with TypeScript and Tailwind CSS extensions

#### Setup Steps

1.  **Fork the Repository** on GitHub
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/YOUR_USERNAME/naija-nutri-hub-frontend.git
    cd naija-nutri-hub-frontend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Set up environment variables** (if needed):
    ```bash
    cp .env.example .env.local
    # Edit .env.local with your configuration
    ```

5.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`

6.  **Verify the setup:**
    - Open your browser and navigate to `http://localhost:3000`
    - Check that the application loads without errors
    - Run the linter to ensure code quality: `npm run lint`

#### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### 2\. Creating Your Branch

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

### 3\. Coding Standards & Style Guide

#### TypeScript & JavaScript Guidelines
- **Use TypeScript** for all new files and components
- **Enable strict mode** - all TypeScript strict checks are enabled
- **Define proper types** for all props, state, and function parameters
- **Use interfaces** for object shapes and type definitions
- **Prefer `const` and `let`** over `var`
- **Use arrow functions** for component methods and callbacks
- **Implement proper error handling** with try-catch blocks where appropriate

#### React Component Guidelines
- **Use functional components** with hooks (no class components)
- **Follow the component structure**:
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

#### File & Folder Structure
- **Use PascalCase** for component files: `UserProfile.tsx`
- **Use camelCase** for utility files: `apiHelpers.ts`
- **Use kebab-case** for page files: `user-profile/page.tsx`
- **Organize components** in feature-based folders under `src/components/features/`
- **Keep UI components** in `src/components/ui/` (shadcn/ui components)

#### Tailwind CSS Guidelines
- **Use utility classes** instead of custom CSS when possible
- **Follow the design system** defined in `src/app/globals.css`
- **Use CSS variables** for consistent theming
- **Responsive design** with mobile-first approach
- **Use semantic color names** from the design system

#### Form Handling
- **Use React Hook Form** for all form implementations
- **Implement Zod validation** for form schemas
- **Follow the existing form patterns** in `src/components/features/`
- **Provide proper error messages** and validation feedback
- **Use controlled components** for form inputs

#### API Integration
- **Use Axios** for HTTP requests (configured in `src/lib/axios.ts`)
- **Implement proper error handling** for API calls
- **Use TypeScript interfaces** for API response types
- **Follow RESTful conventions** for API endpoints

#### Code Quality
- **Run ESLint** before committing: `npm run lint`
- **Fix all linting errors** before submitting PR
- **Write self-documenting code** with clear variable and function names
- **Add comments** for complex logic or business rules
- **Keep functions small** and focused on a single responsibility

#### Performance Guidelines
- **Use Next.js Image component** for optimized images
- **Implement proper loading states** for async operations
- **Use dynamic imports** for code splitting when appropriate
- **Optimize bundle size** by avoiding unnecessary dependencies

### 4\. Testing Guidelines

#### Testing Requirements
- **Write unit tests** for utility functions and custom hooks
- **Test component behavior** with user interactions
- **Test form validation** and error handling
- **Test API integration** with mock data
- **Ensure accessibility** with proper ARIA labels and keyboard navigation

#### Testing Tools
- **Jest** for unit testing
- **React Testing Library** for component testing
- **MSW (Mock Service Worker)** for API mocking
- **Accessibility testing** with axe-core

### 5\. Keep Changes Focused
- **Address one issue** per pull request
- **Don't mix bug fixes** with feature additions
- **Don't include unrelated refactoring** in the same PR
- **Keep PRs small** and reviewable (ideally under 400 lines of changes)

### 6\. Commit and Push

#### Commit Message Guidelines
Use **Conventional Commits** format for clear, consistent commit messages:

```bash
# Format: type(scope): description
# Examples:
git commit -m "feat(auth): add login form validation"
git commit -m "fix(ui): resolve button padding issue"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(api): simplify user data fetching"
git commit -m "test(auth): add login form unit tests"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

#### Push Your Changes
```bash
git push origin your-branch-name
```

### 7\. Create a Pull Request (PR)

#### Before Creating a PR
1. **Ensure your code is ready:**
   - All tests pass
   - ESLint passes without errors
   - Code follows the style guide
   - Changes are focused and complete

2. **Update your branch** with the latest changes from main:
   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch-name
   git rebase main
   ```

#### Creating the PR
1. **Open a Pull Request** against the **`main`** branch
2. **Use the PR Template** and fill out all sections:
   - **Description**: What changes were made and why
   - **Type of Change**: Bug fix, feature, documentation, etc.
   - **Testing**: How the changes were tested
   - **Screenshots**: If applicable, include before/after screenshots
   - **Checklist**: Confirm all requirements are met

3. **Reference the Issue**: Link to the issue being addressed:
   ```
   Fixes #123
   Closes #456
   Related to #789
   ```

#### PR Review Process
1. **Automated Checks**: CI/CD pipeline will run tests and linting
2. **Code Review**: Maintainers will review your code for:
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

#### PR Best Practices
- **Keep PRs focused** - one feature or bug fix per PR
- **Write descriptive titles** - "Add user authentication" not "Update code"
- **Provide context** - explain the problem and solution
- **Include tests** - demonstrate that your changes work
- **Update documentation** - if your changes affect user-facing features
- **Be responsive** - address feedback promptly

> **Note on Major Changes:** For significant changes (API modifications, architectural changes, breaking changes), please:
> 1. Open an issue first to discuss the approach
> 2. Create a draft PR for early feedback
> 3. Ensure community consensus before implementation

-----

## 📄 Documentation Contributions

Documentation is just as important as the code! Contributions to the documentation are highly valued and help make the project accessible to everyone.

### Types of Documentation Contributions
- **README improvements** - Update project description, setup instructions, or examples
- **Code comments** - Add inline documentation for complex functions
- **API documentation** - Document endpoints and data structures
- **User guides** - Create tutorials and how-to guides
- **Translation** - Help translate documentation to local languages
- **Accessibility docs** - Document accessibility features and guidelines

### Documentation Standards
- **Use clear, concise language** - Write for developers of all skill levels
- **Include examples** - Show practical usage of features
- **Keep it updated** - Ensure documentation matches the current code
- **Use proper formatting** - Follow Markdown best practices
- **Add screenshots** - Visual aids help explain complex concepts

### Documentation Files
- **README.md** - Project overview and getting started guide
- **CONTRIBUTING.md** - This file (contribution guidelines)
- **CODE_OF_CONDUCT.md** - Community behavior guidelines
- **LEADERBOARD.md** - Contributor recognition
- **WHATSAPP_COMMUNITIES.md** - Community communication channels
- **Inline code comments** - Function and component documentation

### How to Contribute to Documentation
1. **Identify areas for improvement** - Look for outdated or unclear information
2. **Follow the same process** as code contributions (fork, branch, PR)
3. **Use descriptive commit messages** - "docs: improve setup instructions"
4. **Test your changes** - Ensure links work and examples are accurate
5. **Get feedback** - Ask for review from maintainers or community members

-----

-----

## 🎉 Hacktoberfest 2024 Guidelines

This project is participating in **Hacktoberfest 2024**! Here's what you need to know:

### 🏆 Hacktoberfest Participation
- **Register**: Sign up at [hacktoberfest.com](https://hacktoberfest.com/)
- **Contribute**: Make 4 valid pull requests to this repository
- **Quality**: Ensure your PRs are meaningful and follow our guidelines
- **Earn Rewards**: Get digital rewards and potentially win prizes!

### 🎯 Contribution Opportunities

#### For Beginners
- **Documentation improvements** - Fix typos, improve clarity
- **UI/UX enhancements** - Improve existing components
- **Bug fixes** - Address issues marked with `good first issue`
- **Accessibility improvements** - Add ARIA labels, improve keyboard navigation

#### For Intermediate Developers
- **New features** - Implement features from the roadmap
- **Component development** - Create reusable UI components
- **Form enhancements** - Improve form validation and user experience
- **API integration** - Connect frontend with backend services

#### For Advanced Developers
- **Performance optimization** - Improve loading times and bundle size
- **Testing infrastructure** - Set up comprehensive testing
- **Architecture improvements** - Refactor and optimize code structure
- **Advanced features** - Implement complex functionality

### 🏅 Leaderboard & Prizes
- **Track your progress** on our [leaderboard](LEADERBOARD.md)
- **Compete for prizes** including LinkedIn Premium vouchers
- **Get recognition** for your contributions to the Nigerian tech community

### 📋 Hacktoberfest Checklist
- [ ] Fork the repository
- [ ] Star the repository
- [ ] Read this contributing guide
- [ ] Check out issues labeled `hacktoberfest`
- [ ] Make meaningful contributions
- [ ] Follow our coding standards
- [ ] Submit quality pull requests
- [ ] Engage with the community

### 🚫 What Doesn't Count
- **Spam PRs** - Low-quality or automated pull requests
- **Duplicate work** - PRs that duplicate existing functionality
- **Off-topic changes** - Changes unrelated to the project
- **Invalid PRs** - PRs that don't follow our guidelines

-----

## 💬 Community & Communication

### Getting Help
- **GitHub Discussions**: For questions and general discussion
- **WhatsApp Communities**: Join our [WhatsApp groups](WHATSAPP_COMMUNITIES.md)
- **Twitter**: Follow [@mlsanigeria](https://twitter.com/mlsanigeria) for updates
- **Issues**: Use GitHub issues for bug reports and feature requests

### Code of Conduct
- **Be respectful** and inclusive in all interactions
- **Help others** learn and grow in the community
- **Provide constructive feedback** in reviews and discussions
- **Report violations** to maintainers if needed

### Mentorship
- **Ask questions** - No question is too basic
- **Share knowledge** - Help others learn from your experience
- **Be patient** - Everyone learns at their own pace
- **Celebrate progress** - Acknowledge improvements and contributions

-----

## 📚 Additional Resources

### Learning Materials
- **Next.js Documentation**: [nextjs.org/docs](https://nextjs.org/docs)
- **React Documentation**: [react.dev](https://react.dev)
- **TypeScript Handbook**: [typescriptlang.org/docs](https://www.typescriptlang.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)

### Development Tools
- **VS Code Extensions**: TypeScript, Tailwind CSS IntelliSense, ESLint
- **Browser DevTools**: Chrome DevTools, Firefox Developer Tools
- **Git Tools**: GitHub Desktop, GitKraken, or command line
- **Design Tools**: Figma (for UI/UX work)

### Nigerian Food Context
- **Local Cuisine**: Understanding Nigerian food culture and dishes
- **Nutritional Information**: Local food databases and nutritional data
- **Cultural Sensitivity**: Respectful representation of Nigerian culture
- **Language Considerations**: Support for local languages and terminology

-----

## ⚖️ Licensing

By contributing, you agree that your contributions will be licensed under the **MIT License**.

### Contributor Agreement
- You certify that you have the right to submit your contributions
- You understand that your contributions will be publicly available
- You agree to the project's code of conduct and contribution guidelines
- You acknowledge that maintainers have the final say on all contributions

---

**Thank you for contributing to Naija Nutri Hub! Together, we're building something amazing for the Nigerian food community. 🇳🇬🍽️**