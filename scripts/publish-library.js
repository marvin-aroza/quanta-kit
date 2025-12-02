const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 1. Build the library
console.log('Building library...');
execSync('ng build ui-kit', { stdio: 'inherit' });

// 2. Read the source package.json to get the new version
const sourcePackagePath = path.resolve(__dirname, '../projects/ui-kit/package.json');
const sourcePackage = JSON.parse(fs.readFileSync(sourcePackagePath, 'utf8'));
const version = sourcePackage.version;

// 3. Update the dist package.json with the new version
const distPackagePath = path.resolve(__dirname, '../dist/ui-kit/package.json');
const distPackage = JSON.parse(fs.readFileSync(distPackagePath, 'utf8'));
distPackage.version = version;
fs.writeFileSync(distPackagePath, JSON.stringify(distPackage, null, 2));

console.log(`Updated dist package.json to version ${version}`);

// 4. Publish from dist
console.log('Publishing to NPM...');
const tag = version.includes('-') ? version.split('-')[1].split('.')[0] : 'latest';
console.log(`Publishing with tag: ${tag}`);
execSync(`npm publish --tag ${tag}`, {
  cwd: path.resolve(__dirname, '../dist/ui-kit'),
  stdio: 'inherit',
});

// 5. Create and Push Git Tag (Manual)
const tagName = `${sourcePackage.name}@${version}`;
console.log(`Creating and pushing git tag: ${tagName}`);

try {
  // Configure git (required for CI)
  execSync('git config user.name "github-actions[bot]"');
  execSync('git config user.email "github-actions[bot]@users.noreply.github.com"');

  // Create tag
  execSync(`git tag -a ${tagName} -m "Release ${tagName}"`);

  // Push tag
  execSync(`git push origin ${tagName}`);
  console.log('Git tag pushed successfully.');
} catch (error) {
  console.error('Failed to create/push git tag:', error.message);
  // Don't fail the build if tagging fails, as npm publish succeeded
}

// Note: We removed the "New tag: ..." log to prevent changesets/action from trying to push the tag again.
