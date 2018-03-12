import { tryToRentBike } from '../action';

const formatStation = (dispatch, getState) => station => ({
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
          onClick: () => tryToRentBike(dispatch, getState)(station[slotId])
        }
      }
    };
  }, {})
});

const updateStationPage = (dispatch, getState) => (
  state = { stations: [{ slots: {} }] },
  action
) => {
  switch (action.type) {
    case 'fetch-stations-success':
      return {
        ...state,
        stations: action.stations.map(formatStation(dispatch, getState))
      };
    default:
      return state;
  }
};

export default updateStationPage;
