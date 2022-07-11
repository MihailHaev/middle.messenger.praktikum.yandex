export const formateTime = (timestamp?: number): string => {
  if (!timestamp) return '';

  const dateToFormate = new Date(timestamp);

  return `${dateToFormate.getHours()}:${dateToFormate.getMinutes()}`;
};
