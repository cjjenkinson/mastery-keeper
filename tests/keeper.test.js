import Keeper from '../src/keeper';
import mocks from './mocks/db.json';

jest.mock('../src/keeper');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Keeper.mockClear();
});

it('The consumer should be able to call new() on Keeper', () => {
  const keeperConsumer = new Keeper();
  expect(keeperConsumer).toBeTruthy();
});

it('We can check if the consumer called the class constructor', () => {
  const keeperConsumer = new Keeper();
  expect(Keeper).toHaveBeenCalledTimes(1);
});

// should [expected behaviour] when [scenario/context]
// should setup db with defaults on first time start
// should not overwrite existing logs on repeated start
