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
        reserve: {
          title: 'Book this bike'
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
