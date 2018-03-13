const updateAdminPage = () => (
  state = {
    stations: [],
    users: []
  },
  action
) => {
  switch (action.type) {
    case 'fetch-stations-success':
      return {
        ...state,
        stations: action.stations
      };
    default:
      return state;
  }
};

export default updateAdminPage;
