export type TestCategory = 'all' | 'unit' | 'integration' | 'async';

export interface TestCaseItem {
  id: string;
  name: string;
  category: 'unit' | 'integration' | 'async';
  targetModule: string;
  durationMs: number;
  status: 'passed' | 'failed' | 'running';
  description: string;
  assertionSnippet: string;
}

export interface FileCoverage {
  filename: string;
  statements: number;
  branches: number;
  functions: number;
  lines: number;
  uncoveredLines?: string;
}

export interface CoverageOverview {
  statements: number;
  branches: number;
  functions: number;
  lines: number;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  durationSec: number;
}
