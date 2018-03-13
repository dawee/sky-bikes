import { PAGES } from './update-state';
import {
  getCurrentMember,
  getLoginFormEmail,
  getRegisterFormPayload
} from './extract-state';
import {
  createSession,
  getAllStations,
  getAllMembers,
  getLoggedMember,
  register,
  rentBike,
  sendBikeToStation,
  deleteSession
} from './service';
import formatTime from './format-time';

export const logout = (dispatch, getState) => event => {
  const { uuid } = getCurrentMember(getState());
  const doNavigate = navigate(dispatch, getState);

  event.preventDefault();
  return deleteSession(uuid).then(() => doNavigate('login'));
};

export const updateTimer = (dispatch, getState) => milliDt => {
  const { bike, rentingHoursLeft, uuid } = getCurrentMember(getState());

  if (!bike || !rentingHoursLeft) {
    return Promise.resolve(null);
  }

  const gap = milliDt / 2000;
  const nextRentingHoursLeft =
    rentingHoursLeft - gap < 0 ? 0 : rentingHoursLeft - gap;

  return dispatch({
    type: 'set-renting-hours-left',
    rentingHoursLeft: nextRentingHoursLeft,
    memberUUID: uuid
  });
};

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

export const updateAllMembers = dispatch => () =>
  getAllMembers().then(members =>
    dispatch({ type: 'fetch-members-success', members })
  );

export const updateRentingData = (dispatch, getState) => () => {
  const { bike, rentingHoursLeft } = getCurrentMember(getState());

  if (!bike) {
    return Promise.resolve(null);
  }

  return dispatch({
    type: 'update-renting-data',
    bikeColor: bike.color,
    formatedTime: formatTime(rentingHoursLeft)
  });
};

export const loadPage = (dispatch, getState) => page => {
  switch (page) {
    case 'admin':
      return updateAllMembers(dispatch, getState)().then(
        updateAllStations(dispatch, getState)
      );
    case 'renting':
      return updateRentingData(dispatch, getState)();
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

  if (member.role == 'admin') {
    return doNavigate('admin');
  }

  switch (page) {
    case 'renting':
      return !member.bike || !member.bike.color
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
    .catch(() => navigate(dispatch, getState)('login'));

export const bootApp = (dispatch, getState) => () => {
  const doNavigate = navigate(dispatch, getState);
  const doProtectedNavigate = protectedNavigate(dispatch, getState);
  const doUpdateTimer = updateTimer(dispatch, getState);
  const doUpdateRentingData = updateRentingData(dispatch, getState);
  const requestedRoute = location.pathname.match(/\/?(\w+)/);
  const requestedPage =
    Object.keys(PAGES).indexOf(requestedRoute && requestedRoute[1]) >= 0
      ? requestedRoute[1]
      : null;

  let lastTimerTimer = Date.now();
  const armTimer = () => {
    const now = Date.now();
    const dt = now - lastTimerTimer;

    doUpdateTimer(dt)
      .then(doUpdateRentingData)
      .then(() => {
        lastTimerTimer = now;

        requestAnimationFrame(armTimer);
      });
  };

  requestAnimationFrame(armTimer);

  if (!requestedPage) {
    return doProtectedNavigate('renting');
  }

  if (requestedPage === 'login' || requestedPage === 'register') {
    return doNavigate(requestedPage);
  }

  return doProtectedNavigate(requestedPage);
};
