export const getDayElapsed = (day: Date | null) => {
  if (!day) return null;

  const now = new Date();
  const timeDifference = now.getTime() - day.getTime();

  return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
};
