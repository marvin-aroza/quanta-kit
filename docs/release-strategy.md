# NPM Release Strategies & Implementation

Big companies (like Google, Facebook, Airbnb) typically use a tiered release strategy to ensure stability while allowing rapid feedback. Here are the three main strategies:

## 1. The Strategies

### 🐣 Canary / Snapshot Releases

#### The Nightly Build

- **What**: Every commit to `main` is automatically published.
- **Version**: `0.0.0-snapshot-20231130-abcdef`
- **Tag**: `npm install pkg@canary`
- **Use Case**: For internal teams or brave users who want the absolute latest code immediately.
- **Pros**: Instant feedback.
- **Cons**: Highly unstable.

### 🚧 Prerelease (Alpha / Beta / RC)

#### The Testing Phase

- **What**: A stabilized version ready for testing but not production.
  - **Alpha**: Feature incomplete, potential breaking changes (`1.0.0-alpha.1`).
  - **Beta**: Feature complete, bug fixing (`1.0.0-beta.1`).
  - **RC**: Release Candidate, essentially the final code (`1.0.0-rc.1`).
- **Tag**: `npm install pkg@next` or `pkg@beta`
- **Use Case**: When working on a major version (v2.0) or a big feature set that needs user testing before "General Availability" (GA).

### 🚀 Stable / General Availability (GA)

#### The Production Release

- **What**: The official, battle-tested release.
- **Version**: `1.0.0`
- **Tag**: `npm install pkg@latest` (default)
- **Use Case**: For all production users.

---

## 2. Implementation in `quanta-kit`

Since you are using **Changesets**, you have built-in support for all these strategies.

### Option A: Implementing Alpha Releases (Prerelease Mode)

**Best for:** "I want to release a few alpha versions of v1.0 before the real v1.0."

1.  **Enter Prerelease Mode**:
    Run this command locally to tell Changesets you are now in "alpha" mode.

    ```bash
    npx changeset pre enter alpha
    ```

    _This creates a `.changeset/pre.json` file._

2.  **Work & Release**:
    - Make changes and run `npx changeset` as usual.
    - When you run the version command:
      ```bash
      npm run version-packages
      ```
      It will generate versions like `0.0.1-alpha.0`, `0.0.1-alpha.1`, etc.

3.  **Publish**:
    - Push your changes. Your CI pipeline will publish these as `quanta-kit@alpha`.
    - Users install via `npm install quanta-kit@alpha`.

4.  **Exit Prerelease**:
    When you are ready for the stable release:

    ```bash
    npx changeset pre exit
    ```

    - The next `npm run version-packages` will bump it to the full `0.0.1` (stable).

### Option B: Implementing Snapshot Releases (Canary)

**Best for:** "I want every PR merge to publish a version automatically."

1.  **No Mode Change Needed**: You don't need to enter a mode.
2.  **Run Command**:
    You would create a separate CI job (or run locally) that does:
    ```bash
    npx changeset version --snapshot
    npx changeset publish --tag canary
    ```
    _This publishes a temporary version without modifying your `package.json` permanently._

---

## 3. Recommendation for You

Start with **Option A (Prerelease Mode)**. It is safer and more controlled.

**Action Plan:**

1.  Run `npx changeset pre enter alpha` locally.
2.  Commit the created file.
3.  Continue your workflow. Your next release will automatically be an alpha!
