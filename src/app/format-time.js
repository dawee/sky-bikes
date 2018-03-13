export const digits = value =>
  `${value}`.length === 1 ? `0${value}` : `${value}`;

const formatTime = rawHours => {
  const hours = Math.floor(rawHours);
  const rawMinutes = (rawHours - hours) * 60;
  const minutes = Math.floor(rawMinutes);
  const seconds = Math.floor((rawMinutes - minutes) * 60);

  return `${digits(hours)}:${digits(minutes)}:${digits(seconds)}`;
};

export default formatTime;
