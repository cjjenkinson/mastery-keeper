export default {
  createDailyLogInsights: data => {
    const percentageDifference = getPercentageDifference(
      data.difference.previous,
      data.difference.current
    );

    const percentageCompletion = getPercentageCompletion(
      data.completion.currentProgress,
      data.completion.target
    );

    const timeToCompletion = getTimeToCompletion(
      data.completion.dailyAverage,
      data.completion.progressDifference,
      data.completion.multiplier
    );

    const insights = {
      percentageDifference,
      percentageCompletion,
      timeToCompletion,
    };

    return insights;
  },
};


const getPercentageDifference = (previous, current) => {
  // validation
  const decreaseValue = previous - current;
  const difference = (decreaseValue / previous) * 100;
  // handle edge cases, increase, decrease, no difference -> 0
  return difference.toFixed(2) + '%';
};

const getPercentageCompletion = (currentProgress, target) => {
  // validation
  const percentageCompletion = (currentProgress / target) * 100;
  return percentageCompletion.toFixed(2) + '%';
};

const getTimeToCompletion = (dailyAverage, difference, multiplier = 1) => {
  // validation
  const averageFromMultiplier = dailyAverage * multiplier;
  const days = Math.round(difference / averageFromMultiplier);
  const months = Math.round(days / 30);
  const years = Math.round(months / 12);
  return {
    days,
    months,
    years,
  };
};
