import * as service from '../service';
import updateLoginPage from './login-page';
import updateRegisterPage from './register-page';
import updateRentingPage from './renting-page';
import updateStationPage from './station-page';

const pages = {
  login: updateLoginPage,
  register: updateRegisterPage,
  renting: updateRentingPage,
  station: updateStationPage
};

const loadPageData = dispatch => page => {
  switch (page) {
    case 'station':
      service
        .getAllStations()
        .then(stations =>
          dispatch({ type: 'fetch-stations-success', stations })
        );
      break;
    default:
      break;
  }
};

const updateState = (dispatch, getState) => (
  state = {
    onOpenPage: loadPageData(dispatch, getState)
  },
  action
) => {
  switch (action.type) {
    case 'navigate':
      if (state.currentPage !== action.page) {
        history.pushState(null, null, action.page);
      }

      return {
        ...state,
        currentPage: action.page,
        page: pages[action.page](dispatch, getState)(undefined, action)
      };
    default:
      return state.currentPage
        ? {
            ...state,
            page: pages[state.currentPage](dispatch, getState)(
              state.page,
              action
            )
          }
        : state;
  }
};

export default updateState;
