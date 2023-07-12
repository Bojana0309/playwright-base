import { mergeHTMLReports } from 'playwright-merge-html-reports';

const inputReportPaths = [
  process.cwd() + '/playwright-report-api-tests-1_5',
  process.cwd() + '/playwright-report-api-tests-2_5',
  process.cwd() + '/playwright-report-api-tests-3_5',
  process.cwd() + '/playwright-report-api-tests-4_5',
  process.cwd() + '/playwright-report-api-tests-5_5',
  process.cwd() + '/playwright-report-e2e-tests-chromium-1_5',
  process.cwd() + '/playwright-report-e2e-tests-chromium-2_5',
  process.cwd() + '/playwright-report-e2e-tests-chromium-3_5',
  process.cwd() + '/playwright-report-e2e-tests-chromium-4_5',
  process.cwd() + '/playwright-report-e2e-tests-chromium-5_5',
  process.cwd() + '/playwright-report-e2e-tests-firefox-1_5',
  process.cwd() + '/playwright-report-e2e-tests-firefox-2_5',
  process.cwd() + '/playwright-report-e2e-tests-firefox-3_5',
  process.cwd() + '/playwright-report-e2e-tests-firefox-4_5',
  process.cwd() + '/playwright-report-e2e-tests-firefox-5_5',
  process.cwd() + '/playwright-report-e2e-tests-webkit-1_5',
  process.cwd() + '/playwright-report-e2e-tests-webkit-2_5',
  process.cwd() + '/playwright-report-e2e-tests-webkit-3_5',
  process.cwd() + '/playwright-report-e2e-tests-webkit-4_5',
  process.cwd() + '/playwright-report-e2e-tests-webkit-5_5'
];

const config = {
  outputFolderName: 'merged-html-report'
};

mergeHTMLReports(inputReportPaths, config);
