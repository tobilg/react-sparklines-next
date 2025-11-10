# Publishing Guide

This project uses GitHub Actions to automatically publish new versions to npm when tags are created.

## Prerequisites

1. **NPM_TOKEN Secret**: The repository must have an `NPM_TOKEN` secret configured in GitHub Settings.
   - Go to GitHub repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your npm access token (generate one at https://www.npmjs.com/settings/YOUR_USERNAME/tokens)
   - Use "Automation" token type for CI/CD

## Release Process

### 1. Update Version

Update the version in `package.json`:

```bash
# For patch release (1.7.0 → 1.7.1)
npm version patch

# For minor release (1.7.0 → 1.8.0)
npm version minor

# For major release (1.7.0 → 2.0.0)
npm version major
```

This will:
- Update the version in `package.json`
- Create a git commit with the message "1.7.1" (or whatever version)
- Create a git tag (e.g., `v1.7.1`)

### 2. Push Changes and Tag

```bash
# Push the commit and tag to GitHub
git push origin main --follow-tags
```

Or push separately:

```bash
git push origin main
git push origin v1.7.1
```

### 3. Automated Publishing

Once the tag is pushed to GitHub:

1. **GitHub Actions triggers** the CI workflow
2. **Tests run** on Node.js 18, 20, and 22
3. **If tests pass**, the publish job runs:
   - Installs dependencies
   - Builds the package (`npm run compile`)
   - Publishes to npm registry

### 4. Verify Publication

Check that the new version is published:
- Visit https://www.npmjs.com/package/react-sparklines
- Or run: `npm view react-sparklines version`

## Manual Publishing (Not Recommended)

If you need to publish manually:

```bash
npm run compile
npm publish
```

**Note**: Manual publishing bypasses CI checks and should only be used in exceptional circumstances.

## Workflow Details

The GitHub Actions workflow (`.github/workflows/ci.yml`) includes:

- **Test Job**: Runs on all pushes and PRs
  - Multi-version Node.js testing (18, 20, 22)
  - Runs test suite
  - Verifies build

- **Publish Job**: Only runs on version tags
  - Requires test job to pass
  - Only triggers for tags matching `v*.*.*` pattern
  - Uses `NPM_TOKEN` secret for authentication
  - Runs on Node.js 20

## Versioning Guidelines

Follow [Semantic Versioning](https://semver.org/):

- **PATCH** (1.7.x): Bug fixes, minor changes
- **MINOR** (1.x.0): New features, backward compatible
- **MAJOR** (x.0.0): Breaking changes

## Troubleshooting

### Publishing Fails

1. **Check NPM_TOKEN**: Ensure the secret is set correctly in GitHub
2. **Check npm permissions**: Verify your npm account has publish rights
3. **Check version**: Ensure the version doesn't already exist on npm
4. **Check tests**: Publishing only happens if all tests pass

### Tag Already Exists

If you need to recreate a tag:

```bash
# Delete local tag
git tag -d v1.7.1

# Delete remote tag
git push origin :refs/tags/v1.7.1

# Create and push new tag
npm version patch
git push origin main --follow-tags
```
