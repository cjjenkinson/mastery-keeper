export function formatRawHours(hoursRaw) {
  var date = new Date(
    hoursRaw * 3600 /* sec per hr */ * 1000 /* msec per sec */
  );
  return (
    ('' + date.getUTCHours()).slice(-2) +
    ' hours ' +
    ('0' + date.getUTCMinutes()).slice(-2) +
    ' minutes'
  );
}

// yesterday difference plus / minis percentage -46%
export function getPercentageDifference(previous, current) {
  const decreaseValue = previous - current;
  const difference = decreaseValue / previous * 100;
  // handle edge cases, increase, decrease, no difference -> 0
  return difference.toFixed(2) + '%';
}

export function getPercentageCompletion(currentProgress, targetProgress) {
  const percentageCompletion = currentProgress / targetProgress * 100;
  return percentageCompletion.toFixed(2) + '%';
}

export function getTimeToCompletion(average, remaining, multiplier = 1) {
  const averageFromMultiplier = average * multiplier;
  const days = Math.round(remaining / averageFromMultiplier);
  const months = Math.round(days / 30);
  const years = Math.round(months / 12);
  return {
    days,
    months,
    years,
  };
}
