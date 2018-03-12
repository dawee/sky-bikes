import { PAGES } from './update-state';
import {
  getCurrentMember,
  getLoginFormEmail,
  getRegisterFormPayload
} from './extract-state';
import {
  createSession,
  getAllStations,
  getLoggedMember,
  register,
  rentBike,
  sendBikeToStation
} from './service';

export const returnBike = (dispatch, getState) => (stationUUID, slotIndex) => {
  const { bike } = getCurrentMember(getState());

  return sendBikeToStation(stationUUID, {
    bike: { slot: slotIndex, uuid: bike.uuid }
  })
    .then(() => updateCurrentMember(dispatch, getState)())
    .then(() => updateAllStations(dispatch, getState)());
};

export const openPreviousStation = (dispatch, getState) => () => {
  const state = getState();
  const index =
    state.page.currentStationIndex <= 0
      ? state.page.stations.length - 1
      : state.page.currentStationIndex - 1;

  return dispatch({ type: 'set-station-index', index });
};

export const openNextStation = (dispatch, getState) => () => {
  const state = getState();
  const index =
    state.page.currentStationIndex >= state.page.stations.length - 1
      ? 0
      : state.page.currentStationIndex + 1;

  return dispatch({ type: 'set-station-index', index });
};

export const tryToRentBike = (dispatch, getState) => bike => {
  const doProtectedNavigate = protectedNavigate(dispatch, getState);

  return rentBike(bike).then(() => doProtectedNavigate('renting'));
};

export const openProfile = (dispatch, getState) => email => {
  const doProtectedNavigate = protectedNavigate(dispatch, getState);

  return createSession({ email }).then(() => doProtectedNavigate('renting'));
};

export const logIn = (dispatch, getState) => event => {
  const email = getLoginFormEmail(getState());
  const doOpenProfile = openProfile(dispatch, getState);

  event.preventDefault();
  return doOpenProfile(email);
};

export const createAccount = (dispatch, getState) => event => {
  const payload = getRegisterFormPayload(getState());
  const doOpenProfile = openProfile(dispatch, getState);

  event.preventDefault();
  return register(payload).then(() => doOpenProfile(payload.email));
};

export const updateAllStations = dispatch => () =>
  getAllStations().then(stations =>
    dispatch({ type: 'fetch-stations-success', stations })
  );

export const loadPage = (dispatch, getState) => page => {
  switch (page) {
    case 'station':
      return updateAllStations(dispatch, getState)();
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

export const updateCurrentMember = dispatch => () =>
  getLoggedMember()
    .then(member => dispatch({ type: 'fetch-member-success', member }))
    .then(({ member }) => dispatch({ type: 'set-current-member', member }));

export const protectedNavigate = (dispatch, getState) => page =>
  updateCurrentMember(dispatch, getState)()
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
    return doProtectedNavigate('renting');
  }

  if (requestedPage === 'login' || requestedPage === 'register') {
    return doNavigate(requestedPage);
  }

  return doProtectedNavigate(requestedPage);
};
