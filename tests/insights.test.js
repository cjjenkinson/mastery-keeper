import insights from '../src/insights';
import mocks from './mocks/insights';

test('should create log insights when passed the report data object', () => {
  const insights = insights.getLogInsights(mocks.report)
  expect(insights).toEqual(mocks.insights);
});
