module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/']
  }