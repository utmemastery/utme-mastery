// backend/core/spacedRepetition.js
const calculateNextReview = ({ reviewRating, easeFactor, interval, repetitions, lastReview }) => {
  let newEaseFactor = easeFactor;
  let newInterval = interval;
  let newRepetitions = repetitions;

  // Adjust ease factor based on review rating (1–4: Again, Hard, Good, Easy)
  if (reviewRating < 3) {
    newRepetitions = 0;
    newInterval = 1;
  } else {
    newEaseFactor = easeFactor + (0.1 - (4 - reviewRating) * (0.08 + (4 - reviewRating) * 0.02));
    newEaseFactor = Math.max(1.3, newEaseFactor); // Minimum ease factor
    newRepetitions += 1;

    if (newRepetitions === 1) {
      newInterval = 1;
    } else if (newRepetitions === 2) {
      newInterval = 6;
    } else {
      newInterval = Math.ceil(interval * newEaseFactor);
    }
  }

  const nextReview = new Date(lastReview);
  nextReview.setDate(nextReview.getDate() + newInterval);

  return { newEaseFactor, newInterval, newRepetitions, nextReview };
};

module.exports = { calculateNextReview };