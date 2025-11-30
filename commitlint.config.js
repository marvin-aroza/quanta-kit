module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [(message) => message.includes('Version Packages')],
};
