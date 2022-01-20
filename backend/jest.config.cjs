module.exports = {
  preset: "@shelf/jest-mongodb",
  transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  // automock: true,
  verbose: true,
}