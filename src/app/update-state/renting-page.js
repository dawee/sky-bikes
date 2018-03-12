const updateRentingPage = () => () => ({
  renting: {
    bikeColor: 'blue',
    rentingSentence: 'You are currently renting a bike',
    timeSentence: {
      begin: 'You have',
      value: '07:30:00',
      end: 'left to return it'
    },
    returnBike: {
      title: 'Return this bike'
    }
  }
});

export default updateRentingPage;
