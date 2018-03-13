import { protectedNavigate, logout } from '../action';

const updateRentingPage = (dispatch, getState) => (
  state = {
    header: {
      logout: {
        title: 'Log out',
        onClick: logout(dispatch, getState)
      }
    },
    renting: {
      rentingSentence: 'You are currently renting a bike',
      timeSentence: {
        begin: 'You have',
        value: '',
        end: 'left to return it'
      },
      returnBike: {
        title: 'Return this bike',
        handler: () => protectedNavigate(dispatch, getState)('station')
      }
    }
  },
  action
) => {
  switch (action.type) {
    case 'update-renting-data':
      return {
        ...state,
        renting: {
          ...state.renting,
          bikeColor: action.bikeColor,
          timeSentence: {
            ...state.renting.timeSentence,
            value: action.formatedTime
          }
        }
      };
    default:
      return state;
  }
};

export default updateRentingPage;
