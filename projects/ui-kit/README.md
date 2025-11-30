# Quanta Kit

**Quanta Kit** is a premium Angular component library built with **Material Design 3** and **Atomic Design** principles.

## 📦 Installation

```bash
npm install quanta-kit
```

## 🔨 Setup

1.  **Import Styles**: Add the global styles to your `angular.json` or `styles.scss`:

    ```scss
    // styles.scss
    @import 'quanta-kit/styles/main';
    ```

2.  **Add Assets**: If the library uses assets (icons, fonts), ensure they are configured in your `angular.json`.

## 🚀 Usage

Import the standalone components directly in your application:

```typescript
import { Component } from '@angular/core';
import { QuantaButtonComponent } from 'quanta-kit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [QuantaButtonComponent],
  template: ` <quanta-button variant="primary"> Click Me </quanta-button> `,
})
export class AppComponent {}
```

## 🎨 Theming

Quanta Kit supports light and dark modes via CSS variables.

To enable dark mode, add the `data-theme="dark"` attribute to your `<body>` tag:

```html
<body data-theme="dark">
  <app-root></app-root>
</body>
```

## 📚 Documentation

For full documentation and component examples, visit our [Storybook](https://your-storybook-url.com).
