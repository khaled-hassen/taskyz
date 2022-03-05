export function progressState(completed: number, total: number) {
  const isDone = 100 - getCompletion(completed, total) < Number.EPSILON;
  return isDone ? "Done" : "In progress";
}

export const displayProgress = (completed: number, total: number) =>
  `${getCompletion(completed, total).toFixed(0)}%`;

export function getCompletion(completed: number, total: number) {
  if (total === 0) return 0;
  return (completed / total) * 100;
}
