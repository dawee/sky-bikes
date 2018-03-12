import { PAGES } from './update-state';
import { getCurrentMember } from './extract-state';
import { getAllStations, getLoggedMember } from './service';

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

    return loadPage(dispatch, getState)(page);
  });
};

export const conditionalNavigate = (dispatch, getState) => page => {
  const doNavigate = navigate(dispatch, getState);
  const member = getCurrentMember(getState());

  switch (page) {
    case 'renting':
      return member.rentingHoursLeft === null
        ? doNavigate('station')
        : doNavigate('renting');
    default:
      return doNavigate(page);
  }
};

export const protectedNavigate = (dispatch, getState) => page =>
  getLoggedMember()
    .then(member => dispatch({ type: 'fetch-member-success', member }))
    .then(({ member }) => dispatch({ type: 'set-current-member', member }))
    .then(() => conditionalNavigate(dispatch, getState)(page))
    .catch(() => navigate(dispatch, getState)('register'));

export const bootApp = (dispatch, getState) => () => {
  const doNavigate = navigate(dispatch, getState);
  const doProtectedNavigate = protectedNavigate(dispatch, getState);
  const requestedRoute = location.pathname.match(/\/?(\w+)/);
  const requestedPage =
    Object.keys(PAGES).indexOf(requestedRoute && requestedRoute[1]) >= 0
      ? requestedRoute[1]
      : null;

  if (!requestedPage) {
    return doNavigate('register');
  }

  if (requestedPage === 'login' || requestedPage === 'register') {
    return doNavigate(requestedPage);
  }

  return doProtectedNavigate(requestedPage);
};
