import { mergeHTMLReports } from 'playwright-merge-html-reports';

const inputReportPaths = [
  process.cwd() + '/playwright-report-api-tests-1_4',
  process.cwd() + '/playwright-report-api-tests-2_4',
  process.cwd() + '/playwright-report-api-tests-3_4',
  process.cwd() + '/playwright-report-api-tests-4_4',
  process.cwd() + '/playwright-report-e2e-tests-chromium-1_4',
  process.cwd() + '/playwright-report-e2e-tests-chromium-2_4',
  process.cwd() + '/playwright-report-e2e-tests-chromium-3_4',
  process.cwd() + '/playwright-report-e2e-tests-chromium-4_4',
  process.cwd() + '/playwright-report-e2e-tests-firefox-1_4',
  process.cwd() + '/playwright-report-e2e-tests-firefox-2_4',
  process.cwd() + '/playwright-report-e2e-tests-firefox-3_4',
  process.cwd() + '/playwright-report-e2e-tests-firefox-4_4',
  process.cwd() + '/playwright-report-e2e-tests-webkit-1_4',
  process.cwd() + '/playwright-report-e2e-tests-webkit-2_4',
  process.cwd() + '/playwright-report-e2e-tests-webkit-3_4',
  process.cwd() + '/playwright-report-e2e-tests-webkit-4_4'
];

const config = {
  outputFolderName: 'merged-html-report'
};

mergeHTMLReports(inputReportPaths, config);
