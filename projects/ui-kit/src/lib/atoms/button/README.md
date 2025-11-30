# Button Component

The `quanta-button` component is a versatile button element that adheres to Material 3 design guidelines. It supports multiple variants, colors, and icon integration.

## Usage

```html
<quanta-button variant="filled" color="primary" (clicked)="handleClick()"> Click Me </quanta-button>
```

### With Icon

Use the `icon-start` or `icon-end` attributes to project icons.

```html
<quanta-button variant="outlined">
  <mat-icon icon-start>add</mat-icon>
  Add Item
</quanta-button>
```

## API

### Inputs

| Name       | Type                                                        | Default     | Description                     |
| ---------- | ----------------------------------------------------------- | ----------- | ------------------------------- |
| `variant`  | `'filled' \| 'tonal' \| 'outlined' \| 'text' \| 'elevated'` | `'filled'`  | The visual style of the button. |
| `color`    | `'primary' \| 'secondary' \| 'tertiary' \| 'error'`         | `'primary'` | The color palette to use.       |
| `type`     | `'button' \| 'submit' \| 'reset'`                           | `'button'`  | The native button type.         |
| `disabled` | `boolean`                                                   | `false`     | Whether the button is disabled. |

### Outputs

| Name      | Type                  | Description                         |
| --------- | --------------------- | ----------------------------------- |
| `clicked` | `EventEmitter<Event>` | Emitted when the button is clicked. |

## Accessibility

- Uses the native `<button>` element for built-in keyboard navigation and focus management.
- Supports `disabled` state with correct ARIA attributes.
