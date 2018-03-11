import updateLoginPage from './login-page';
import updateRegisterPage from './register-page';

const pages = {
  login: updateLoginPage,
  register: updateRegisterPage
};

const updateState = (dispatch, getState) => (state = {}, action) => {
  switch (action.type) {
    case 'navigate':
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
