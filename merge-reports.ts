import { mergeHTMLReports } from 'playwright-merge-html-reports';

const inputReportPaths = [
  process.cwd() + '/playwright-report-chromium-1_3',
  process.cwd() + '/playwright-report-chromium-2_3',
  process.cwd() + '/playwright-report-chromium-3_3',
  process.cwd() + '/playwright-report-firefox-1_3',
  process.cwd() + '/playwright-report-firefox-2_3',
  process.cwd() + '/playwright-report-firefox-3_3',
  process.cwd() + '/playwright-report-webkit-1_3',
  process.cwd() + '/playwright-report-webkit-2_3',
  process.cwd() + '/playwright-report-webkit-3_3'
];

const config = {
  outputFolderName: 'merged-html-report'
};

mergeHTMLReports(inputReportPaths, config);
