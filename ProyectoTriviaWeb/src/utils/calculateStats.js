export function calculateStats(correct, total) {
  return {
    correct,
    total,
    percent: total ? Math.round((correct / total) * 100) : 0,
  };
}
