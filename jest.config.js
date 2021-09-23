module.exports = {
    preset: '@shelf/jest-mongodb',
    coverageDirectory:"coverage",
    testEnvironment: "node",
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    roots: ['<rootDir>/tests'],
    collectCoverageFrom: [
      '<rootDir>/src/**/*.ts',
      '!<rootDir>/src/main/**'
    ],
    moduleFileExtensions: ['js', 'ts'],
}