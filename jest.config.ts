/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config']
    // globalSetup: './src/tests/testSetup.ts', 
    // globalTeardown:'./src/tests/testTeardown.ts'

};

export default config;
