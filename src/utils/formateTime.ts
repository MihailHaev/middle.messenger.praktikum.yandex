export const formateTime = (timestamp: number): string => {
  const dateToFormate = new Date(timestamp);

  return `${dateToFormate.getHours()}:${dateToFormate.getMinutes()}`;
};
