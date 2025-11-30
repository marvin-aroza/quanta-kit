import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'quanta-style-guide',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="style-guide">
      <header>
        <h1 class="display-large">Material 3 Design System</h1>
        <p class="body-large">Reference guide for tokens and styles.</p>
      </header>

      <section>
        <h2 class="headline-medium">Colors</h2>

        <div class="color-group">
          <h3 class="title-medium">Primary</h3>
          <div class="color-grid">
            <div
              class="color-card"
              style="background: var(--md-sys-color-primary); color: var(--md-sys-color-on-primary)"
            >
              <div class="label">Primary</div>
              <code>--md-sys-color-primary</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-on-primary); color: var(--md-sys-color-primary); border: 1px solid var(--md-sys-color-outline)"
            >
              <div class="label">On Primary</div>
              <code>--md-sys-color-on-primary</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-primary-container); color: var(--md-sys-color-on-primary-container)"
            >
              <div class="label">Primary Container</div>
              <code>--md-sys-color-primary-container</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-on-primary-container); color: var(--md-sys-color-primary-container)"
            >
              <div class="label">On Primary Container</div>
              <code>--md-sys-color-on-primary-container</code>
            </div>
          </div>
        </div>

        <div class="color-group">
          <h3 class="title-medium">Secondary</h3>
          <div class="color-grid">
            <div
              class="color-card"
              style="background: var(--md-sys-color-secondary); color: var(--md-sys-color-on-secondary)"
            >
              <div class="label">Secondary</div>
              <code>--md-sys-color-secondary</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-on-secondary); color: var(--md-sys-color-secondary); border: 1px solid var(--md-sys-color-outline)"
            >
              <div class="label">On Secondary</div>
              <code>--md-sys-color-on-secondary</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-secondary-container); color: var(--md-sys-color-on-secondary-container)"
            >
              <div class="label">Secondary Container</div>
              <code>--md-sys-color-secondary-container</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-on-secondary-container); color: var(--md-sys-color-secondary-container)"
            >
              <div class="label">On Secondary Container</div>
              <code>--md-sys-color-on-secondary-container</code>
            </div>
          </div>
        </div>

        <div class="color-group">
          <h3 class="title-medium">Tertiary</h3>
          <div class="color-grid">
            <div
              class="color-card"
              style="background: var(--md-sys-color-tertiary); color: var(--md-sys-color-on-tertiary)"
            >
              <div class="label">Tertiary</div>
              <code>--md-sys-color-tertiary</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-on-tertiary); color: var(--md-sys-color-tertiary); border: 1px solid var(--md-sys-color-outline)"
            >
              <div class="label">On Tertiary</div>
              <code>--md-sys-color-on-tertiary</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-tertiary-container); color: var(--md-sys-color-on-tertiary-container)"
            >
              <div class="label">Tertiary Container</div>
              <code>--md-sys-color-tertiary-container</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-on-tertiary-container); color: var(--md-sys-color-tertiary-container)"
            >
              <div class="label">On Tertiary Container</div>
              <code>--md-sys-color-on-tertiary-container</code>
            </div>
          </div>
        </div>

        <div class="color-group">
          <h3 class="title-medium">Error</h3>
          <div class="color-grid">
            <div
              class="color-card"
              style="background: var(--md-sys-color-error); color: var(--md-sys-color-on-error)"
            >
              <div class="label">Error</div>
              <code>--md-sys-color-error</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-on-error); color: var(--md-sys-color-error); border: 1px solid var(--md-sys-color-outline)"
            >
              <div class="label">On Error</div>
              <code>--md-sys-color-on-error</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-error-container); color: var(--md-sys-color-on-error-container)"
            >
              <div class="label">Error Container</div>
              <code>--md-sys-color-error-container</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-on-error-container); color: var(--md-sys-color-error-container)"
            >
              <div class="label">On Error Container</div>
              <code>--md-sys-color-on-error-container</code>
            </div>
          </div>
        </div>

        <div class="color-group">
          <h3 class="title-medium">Surface & Background</h3>
          <div class="color-grid">
            <div
              class="color-card"
              style="background: var(--md-sys-color-surface); color: var(--md-sys-color-on-surface); border: 1px solid var(--md-sys-color-outline)"
            >
              <div class="label">Surface</div>
              <code>--md-sys-color-surface</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-on-surface); color: var(--md-sys-color-surface)"
            >
              <div class="label">On Surface</div>
              <code>--md-sys-color-on-surface</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-surface-variant); color: var(--md-sys-color-on-surface-variant)"
            >
              <div class="label">Surface Variant</div>
              <code>--md-sys-color-surface-variant</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-on-surface-variant); color: var(--md-sys-color-surface-variant)"
            >
              <div class="label">On Surface Variant</div>
              <code>--md-sys-color-on-surface-variant</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-background); color: var(--md-sys-color-on-background); border: 1px solid var(--md-sys-color-outline)"
            >
              <div class="label">Background</div>
              <code>--md-sys-color-background</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-on-background); color: var(--md-sys-color-background)"
            >
              <div class="label">On Background</div>
              <code>--md-sys-color-on-background</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-outline); color: var(--md-sys-color-surface)"
            >
              <div class="label">Outline</div>
              <code>--md-sys-color-outline</code>
            </div>
            <div
              class="color-card"
              style="background: var(--md-sys-color-outline-variant); color: var(--md-sys-color-on-surface-variant)"
            >
              <div class="label">Outline Variant</div>
              <code>--md-sys-color-outline-variant</code>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 class="headline-medium">Typography</h2>
        <div class="typography-list">
          <div class="type-row">
            <span class="display-large">Display Large</span>
            <code>--md-sys-typescale-display-large</code>
          </div>
          <div class="type-row">
            <span class="display-medium">Display Medium</span>
            <code>--md-sys-typescale-display-medium</code>
          </div>
          <div class="type-row">
            <span class="display-small">Display Small</span>
            <code>--md-sys-typescale-display-small</code>
          </div>

          <div class="divider"></div>

          <div class="type-row">
            <span class="headline-large">Headline Large</span>
            <code>--md-sys-typescale-headline-large</code>
          </div>
          <div class="type-row">
            <span class="headline-medium">Headline Medium</span>
            <code>--md-sys-typescale-headline-medium</code>
          </div>
          <div class="type-row">
            <span class="headline-small">Headline Small</span>
            <code>--md-sys-typescale-headline-small</code>
          </div>

          <div class="divider"></div>

          <div class="type-row">
            <span class="title-large">Title Large</span>
            <code>--md-sys-typescale-title-large</code>
          </div>
          <div class="type-row">
            <span class="title-medium">Title Medium</span>
            <code>--md-sys-typescale-title-medium</code>
          </div>
          <div class="type-row">
            <span class="title-small">Title Small</span>
            <code>--md-sys-typescale-title-small</code>
          </div>

          <div class="divider"></div>

          <div class="type-row">
            <span class="body-large">Body Large</span>
            <code>--md-sys-typescale-body-large</code>
          </div>
          <div class="type-row">
            <span class="body-medium">Body Medium</span>
            <code>--md-sys-typescale-body-medium</code>
          </div>
          <div class="type-row">
            <span class="body-small">Body Small</span>
            <code>--md-sys-typescale-body-small</code>
          </div>

          <div class="divider"></div>

          <div class="type-row">
            <span class="label-large">Label Large</span>
            <code>--md-sys-typescale-label-large</code>
          </div>
          <div class="type-row">
            <span class="label-medium">Label Medium</span>
            <code>--md-sys-typescale-label-medium</code>
          </div>
          <div class="type-row">
            <span class="label-small">Label Small</span>
            <code>--md-sys-typescale-label-small</code>
          </div>
        </div>
      </section>

      <section>
        <h2 class="headline-medium">Elevation</h2>
        <div class="elevation-grid">
          <div class="elevation-card level-0">Level 0</div>
          <div class="elevation-card level-1">Level 1</div>
          <div class="elevation-card level-2">Level 2</div>
          <div class="elevation-card level-3">Level 3</div>
          <div class="elevation-card level-4">Level 4</div>
          <div class="elevation-card level-5">Level 5</div>
        </div>
      </section>

      <section>
        <h2 class="headline-medium">Shapes</h2>
        <div class="shape-grid">
          <div class="shape-card xs">XS (4px)</div>
          <div class="shape-card sm">Small (8px)</div>
          <div class="shape-card md">Medium (12px)</div>
          <div class="shape-card lg">Large (16px)</div>
          <div class="shape-card xl">XL (28px)</div>
          <div class="shape-card full">Full</div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .style-guide {
        padding: 4rem;
        background-color: var(--md-sys-color-background);
        color: var(--md-sys-color-on-background);
        font-family: var(--font-family-sans);
      }

      section {
        margin-bottom: 4rem;
      }

      h1,
      h2,
      h3 {
        margin: 0 0 1rem;
      }

      header {
        margin-bottom: 4rem;
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
        padding-bottom: 2rem;
      }

      /* Colors */
      .color-group {
        margin-bottom: 2rem;
      }

      .color-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1rem;
      }

      .color-card {
        padding: 1.5rem;
        border-radius: var(--md-sys-shape-corner-medium);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        min-height: 120px;

        .label {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        code {
          font-size: 0.75rem;
          opacity: 0.8;
        }
      }

      /* Typography */
      .typography-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .type-row {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        border-bottom: 1px solid var(--md-sys-color-outline-variant);
        padding-bottom: 0.5rem;

        code {
          color: var(--md-sys-color-outline);
          font-size: 0.875rem;
        }
      }

      .divider {
        height: 1rem;
      }

      /* Utility classes for typography */
      .display-large {
        font: var(--md-sys-typescale-display-large);
      }
      .display-medium {
        font: var(--md-sys-typescale-display-medium);
      }
      .display-small {
        font: var(--md-sys-typescale-display-small);
      }

      .headline-large {
        font: var(--md-sys-typescale-headline-large);
      }
      .headline-medium {
        font: var(--md-sys-typescale-headline-medium);
      }
      .headline-small {
        font: var(--md-sys-typescale-headline-small);
      }

      .title-large {
        font: var(--md-sys-typescale-title-large);
      }
      .title-medium {
        font: var(--md-sys-typescale-title-medium);
      }
      .title-small {
        font: var(--md-sys-typescale-title-small);
      }

      .body-large {
        font: var(--md-sys-typescale-body-large);
      }
      .body-medium {
        font: var(--md-sys-typescale-body-medium);
      }
      .body-small {
        font: var(--md-sys-typescale-body-small);
      }

      .label-large {
        font: var(--md-sys-typescale-label-large);
      }
      .label-medium {
        font: var(--md-sys-typescale-label-medium);
      }
      .label-small {
        font: var(--md-sys-typescale-label-small);
      }

      /* Elevation */
      .elevation-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 2rem;
      }

      .elevation-card {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--md-sys-color-surface-container-low, #f3f6ea); /* Fallback */
        color: var(--md-sys-color-on-surface);
        border-radius: var(--md-sys-shape-corner-medium);
      }

      .level-0 {
        box-shadow: var(--md-sys-elevation-0);
      }
      .level-1 {
        box-shadow: var(--md-sys-elevation-1);
      }
      .level-2 {
        box-shadow: var(--md-sys-elevation-2);
      }
      .level-3 {
        box-shadow: var(--md-sys-elevation-3);
      }
      .level-4 {
        box-shadow: var(--md-sys-elevation-4);
      }
      .level-5 {
        box-shadow: var(--md-sys-elevation-5);
      }

      /* Shapes */
      .shape-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 2rem;
      }

      .shape-card {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--md-sys-color-primary-container);
        color: var(--md-sys-color-on-primary-container);
        border: 1px solid var(--md-sys-color-outline);
      }

      .xs {
        border-radius: var(--md-sys-shape-corner-extra-small);
      }
      .sm {
        border-radius: var(--md-sys-shape-corner-small);
      }
      .md {
        border-radius: var(--md-sys-shape-corner-medium);
      }
      .lg {
        border-radius: var(--md-sys-shape-corner-large);
      }
      .xl {
        border-radius: var(--md-sys-shape-corner-extra-large);
      }
      .full {
        border-radius: var(--md-sys-shape-corner-full);
      }
    `,
  ],
})
export class StyleGuideComponent {}
