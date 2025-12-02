# Contributing to Quanta Kit

Thank you for your interest in contributing to Quanta Kit!

## Development Workflow

1.  **Setup**:

    ```bash
    npm install
    ```

2.  **Development**:
    - Run Storybook to view components:
      ```bash
      npm run storybook
      ```
    - Generate new components:
      ```bash
      npm run generate
      ```

3.  **Code Quality**:
    - Ensure linting passes:
      ```bash
      npm run lint
      ```
    - Format code:
      ```bash
      npm run format
      ```

4.  **Commit Messages**:
    - We use [Conventional Commits](https://www.conventionalcommits.org/).
    - Example: `feat: add button component`, `fix: resolve style issue`.

5.  **Releases**:
    - We use [Changesets](https://github.com/changesets/changesets) for versioning.
    - Run `npx changeset` to document your changes before submitting a PR.
