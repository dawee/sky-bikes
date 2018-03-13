const updateAdminPage = () => (
  state = {
    stations: [],
    members: []
  },
  action
) => {
  switch (action.type) {
    case 'fetch-stations-success':
      return {
        ...state,
        stations: action.stations
      };
    case 'fetch-members-success':
      return {
        ...state,
        members: action.members
      };
    default:
      return state;
  }
};

export default updateAdminPage;
