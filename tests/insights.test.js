import insights from '../src/insights';
import mocks from './mocks/insights';

test('should create log insights when passed the report data object', () => {
  const insightsData = insights.getLogInsights(mocks.report)

  expect(insightsData.percentageDifference).toBe("-66.00%");
  expect(insightsData.percentageCompletion).toBe("6.00%");
  expect(insightsData.timeToCompletion.days).toBe(2089);
  expect(insightsData.timeToCompletion.months).toBe(70);
  expect(insightsData.timeToCompletion.years).toBe(6);
});
