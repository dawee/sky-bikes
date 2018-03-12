import { PAGES } from './update-state';
import { getAllStations } from './service';

export const loadPage = dispatch => page => {
  switch (page) {
    case 'station':
      return getAllStations().then(stations =>
        dispatch({ type: 'fetch-stations-success', stations })
      );
    default:
      return Promise.resolve(null);
  }
};

export const navigate = (dispatch, getState) => page => {
  const state = getState;

  return dispatch({ type: 'navigate', page }).then(action => {
    if (state.currentPage !== action.page) {
      history.pushState(null, null, action.page);
    }

    return action;
  });
};

export const bootApp = (dispatch, getState) => () => {
  const requestedRoute = location.pathname.match(/\/?(\w+)/);
  const requestedPage =
    Object.keys(PAGES).indexOf(requestedRoute && requestedRoute[1]) >= 0
      ? requestedRoute[1]
      : null;

  if (!requestedPage) {
    return navigate(dispatch, getState)('register');
  }

  return navigate(dispatch, getState)(requestedPage);
};
