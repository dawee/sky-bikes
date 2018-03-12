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
  const updatePage = (page, action, pageState) =>
    PAGES[page](dispatch, getState)(pageState, action);

  switch (action.type) {
    case 'navigate':
      return {
        ...state,
        currentPage: action.page,
        page: updatePage(action.page, action)
      };
    default:
      return state.currentPage
        ? { ...state, page: updatePage(state.currentPage, action, state.page) }
        : state;
  }
};

export default updateState;
