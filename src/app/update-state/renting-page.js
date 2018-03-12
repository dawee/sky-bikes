import { getCurrentMember } from '../extract-state';

const digits = value => (`${value}`.length === 1 ? `0${value}` : `${value}`);

const formatTime = rawHours => {
  const hours = Math.floor(rawHours);
  const rawMinutes = (rawHours - hours) * 60;
  const minutes = Math.floor(rawMinutes);
  const seconds = Math.floor((rawMinutes - minutes) * 60);

  return `${digits(hours)}:${digits(minutes)}:${digits(seconds)}`;
};

const updateRentingPage = (dispatch, getState) => () => {
  const { bike, rentingHoursLeft } = getCurrentMember(getState());

  return {
    renting: {
      bikeColor: bike.color,
      rentingSentence: 'You are currently renting a bike',
      timeSentence: {
        begin: 'You have',
        value: formatTime(rentingHoursLeft),
        end: 'left to return it'
      },
      returnBike: {
        title: 'Return this bike'
      }
    }
  };
};

export default updateRentingPage;
