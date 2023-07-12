import { mergeHTMLReports } from 'playwright-merge-html-reports';

const inputReportPaths = [
  process.cwd() + '/playwright-report-api-tests-1_3',
  process.cwd() + '/playwright-report-api-tests-2_3',
  process.cwd() + '/playwright-report-api-tests-3_3',
  process.cwd() + '/playwright-report-e2e-tests-chromium-1_3',
  process.cwd() + '/playwright-report-e2e-tests-chromium-2_3',
  process.cwd() + '/playwright-report-e2e-tests-chromium-3_3',
  process.cwd() + '/playwright-report-e2e-tests-firefox-1_3',
  process.cwd() + '/playwright-report-e2e-tests-firefox-2_3',
  process.cwd() + '/playwright-report-e2e-tests-firefox-3_3',
  process.cwd() + '/playwright-report-e2e-tests-webkit-1_3',
  process.cwd() + '/playwright-report-e2e-tests-webkit-2_3',
  process.cwd() + '/playwright-report-e2e-tests-webkit-3_3'
];

const config = {
  outputFolderName: 'merged-html-report'
};

mergeHTMLReports(inputReportPaths, config);
