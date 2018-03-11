import updateLoginPage from './login-page';
import updateRegisterPage from './register-page';

const pages = {
  login: updateLoginPage,
  register: updateRegisterPage
};

const updateState = (state = {}, action, dispatch, getState) => {
  switch (action.type) {
    case 'navigate':
      return {
        ...state,
        currentPage: action.page,
        page: pages[action.page](undefined, action, dispatch, getState)
      };
    default:
      return state;
  }
};

export default updateState;
