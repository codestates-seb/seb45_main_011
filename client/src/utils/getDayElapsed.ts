/** 현재 날짜(now)와 비교할 날짜(day) 사이의 일수를 계산하는 함수 */
export const getDayElapsed = (day: Date | null) => {
  if (!day) return null;

  const now = new Date();

  const timeDifference = now.getTime() - day.getTime();

  return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
};
