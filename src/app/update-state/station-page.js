import * as service from '../service';

const formatStation = station => ({
  ...station,
  slots: Object.keys(station).reduce((slots, slotId) => {
    if (!slotId.startsWith('slot')) {
      return slots;
    }
    return {
      ...slots,
      [slotId]: {
        ...station[slotId],
        rent: {
          title: 'Book this bike',
          onClick: () => {
            const bike = station[slotId];

            if (bike) {
              service.rentBike(bike);
            }
          }
        }
      }
    };
  }, {})
});

const updateStationPage = () => (
  state = { stations: [{ slots: {} }] },
  action
) => {
  switch (action.type) {
    case 'fetch-stations-success':
      return {
        ...state,
        stations: action.stations.map(formatStation)
      };
    default:
      return state;
  }
};

export default updateStationPage;
