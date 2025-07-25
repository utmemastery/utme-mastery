// backend/tests/spacedRepetition.test.js
const { calculateNextReview } = require('../core/spacedRepetition');

describe('Spaced Repetition', () => {
  test('should calculate next review correctly for Good rating', () => {
    const result = calculateNextReview({
      reviewRating: 3,
      easeFactor: 2.5,
      interval: 1,
      repetitions: 1,
      lastReview: new Date('2025-07-24'),
    });

    expect(result.newEaseFactor).toBeCloseTo(2.42, 2);
    expect(result.newInterval).toBe(6);
    expect(result.newRepetitions).toBe(2);
    expect(result.nextReview).toBeInstanceOf(Date);
  });

  test('should reset for Again rating', () => {
    const result = calculateNextReview({
      reviewRating: 1,
      easeFactor: 2.5,
      interval: 6,
      repetitions: 2,
      lastReview: new Date('2025-07-24'),
    });

    expect(result.newEaseFactor).toBe(2.5);
    expect(result.newInterval).toBe(1);
    expect(result.newRepetitions).toBe(0);
  });
});