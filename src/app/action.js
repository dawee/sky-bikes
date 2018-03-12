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

export const bootApp = dispatch => () => {
  const requestedRoute = location.pathname.match(/\/?(\w+)/);
  const initialPage =
    Object.keys(PAGES).indexOf(requestedRoute && requestedRoute[1]) >= 0
      ? requestedRoute[1]
      : 'register';

  return dispatch({ type: 'navigate', page: initialPage });
};
