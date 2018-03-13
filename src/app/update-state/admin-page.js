import { logout } from '../action';

const updateAdminPage = (dispatch, getState) => (
  state = {
    header: {
      logout: {
        title: 'Log out',
        onClick: logout(dispatch, getState)
      }
    },
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
