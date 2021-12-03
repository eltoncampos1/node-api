import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  testMatch: ['**/*spec.ts'],
  bail: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
};
