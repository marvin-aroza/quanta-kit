# 🎨 Quanta Kit

[![CI/CD](https://github.com/marvin-aroza/quanta-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/marvin-aroza/quanta-kit/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/quanta-kit?color=red)](https://www.npmjs.com/package/quanta-kit)
[![License](https://img.shields.io/npm/l/quanta-kit)](https://github.com/marvin-aroza/quanta-kit/blob/main/LICENSE)

**Quanta Kit** is a modern, scalable Angular component library built with **Material Design 3** principles and organized using **Atomic Design** methodology.

It is designed to provide a premium, consistent, and accessible user experience across all applications.

## 🚀 Features

- **Angular 18+**: Built with the latest Angular features, including **Signals** and **Standalone Components**.
- **Material Design 3**: Fully compliant with M3 tokens for colors, typography, elevation, and shapes.
- **Atomic Design**: Components are structured logically into Atoms, Molecules, and Organisms.
- **Theming**: Robust light and dark mode support using CSS Custom Properties.
- **Accessibility**: Built-in a11y support following WCAG AA standards.
- **Storybook**: Comprehensive documentation and interactive playground.

## 📦 Installation

To install the library in your Angular project:

```bash
npm install quanta-kit
```

_(Note: If this is a private library, ensure you have the correct registry configured)_

## 🛠️ Usage

Import the component you need in your Angular application:

```typescript
import { Component } from '@angular/core';
import { QuantaButtonComponent } from 'quanta-kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuantaButtonComponent],
  template: `
    <quanta-button variant="primary" (clicked)="handleClick()"> Click Me </quanta-button>
  `,
})
export class AppComponent {
  handleClick() {
    console.log('Button clicked!');
  }
}
```

## 📚 Documentation

We use **Storybook** for documentation and component development.

To start Storybook locally:

```bash
npm run storybook
```

This will open the documentation at `http://localhost:6006`.

## 🏗️ Development

### Build

To build the library:

```bash
ng build ui-kit
```

### Lint

To run linting:

```bash
ng lint ui-kit
```

### Test

To run unit tests:

```bash
ng test ui-kit
```

## 🤝 Contributing

1.  Clone the repository.
2.  Install dependencies: `npm install`.
3.  Start Storybook: `npm run storybook`.
4.  Create your component in `projects/ui-kit/src/lib/`.
5.  Ensure it follows the Atomic Design structure (atoms, molecules, organisms).
6.  Add a Storybook story (`.stories.ts`) and documentation.

### 🛠️ Generators

Use Plop to generate new components automatically:

```bash
npm run generate
```

Follow the prompts to select the component type (atom, molecule, etc.) and name.

### 🧹 Code Quality

We use **Prettier** for formatting.

```bash
# Format code
npm run format
```

### 🚀 Releasing

We use **Changesets** for versioning.

1.  Run `npx changeset` to create a release intent.
2.  Select the impact (Major/Minor/Patch).
3.  Commit the changeset file.
4.  Push to `main`.
5.  The CI will create a "Version Packages" PR.
6.  Merge that PR to publish to NPM.

## 📄 License

MIT
