import { loadPage } from '../action';
import updateLoginPage from './login-page';
import updateRegisterPage from './register-page';
import updateRentingPage from './renting-page';
import updateStationPage from './station-page';

export const PAGES = {
  login: updateLoginPage,
  register: updateRegisterPage,
  renting: updateRentingPage,
  station: updateStationPage
};

const updateState = (dispatch, getState) => (
  state = {
    onOpenPage: loadPage(dispatch, getState)
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
        page: PAGES[action.page](dispatch, getState)(undefined, action)
      };
    default:
      return state.currentPage
        ? {
            ...state,
            page: PAGES[state.currentPage](dispatch, getState)(
              state.page,
              action
            )
          }
        : state;
  }
};

export default updateState;
