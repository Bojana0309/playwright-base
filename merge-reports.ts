import { mergeHTMLReports } from 'playwright-merge-html-reports';

const inputReportPaths = [
  process.cwd() + '/playwright-report-api-tests',
  process.cwd() + '/playwright-report-e2e-tests-chromium-1_2',
  process.cwd() + '/playwright-report-e2e-tests-chromium-2_2',
  process.cwd() + '/playwright-report-e2e-tests-firefox-1_2',
  process.cwd() + '/playwright-report-e2e-tests-firefox-2_2',
  process.cwd() + '/playwright-report-e2e-tests-webkit-1_2',
  process.cwd() + '/playwright-report-e2e-tests-webkit-2_2'
];

const config = {
  outputFolderName: 'merged-html-report'
};

mergeHTMLReports(inputReportPaths, config);
