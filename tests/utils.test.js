import utils from '../src/utils';

test('should format raw float to formatted hours and minutes when passed a number', () => {
  const mocks = {
    unformatted: 3.32,
    formatted: '​​​​3 hours 19 minutes',
  };

  expect(utils.formatRawHours(mocks.unformatted)).toBe(mocks.formatted);
});

test('should format raw float to formatted hours and minutes when passed a string', () => {
  const mocks = {
    unformatted: '3.32',
    formatted: '​​​​3 hours 19 minutes',
  };

  expect(utils.formatRawHours(mocks.unformatted)).toBe(mocks.formatted);
});

test('should format the number for display when passed a number', () => {
  const mocks = {
    unformatted: 10000,
    formatted: '10,000',
  };

  expect(utils.formatNumber(mocks.unformatted)).toBe(mocks.formatted);
});

test('should format the number for display when passed a string', () => {
  const mocks = {
    unformatted: '10000',
    formatted: '10,000',
  };

  expect(utils.formatNumber(mocks.unformatted)).toBe(mocks.formatted
  );
});
