import updateLoginPage from './login-page';

const pages = {
  login: updateLoginPage
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
