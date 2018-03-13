export const createSession = payload =>
  fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify(payload),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

export const deleteSession = memberUUID =>
  fetch(`/api/session/${memberUUID}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

export const register = payload =>
  fetch('/api/member', {
    method: 'POST',
    body: JSON.stringify(payload),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

export const rentBike = payload =>
  fetch('/api/renting', {
    method: 'POST',
    body: JSON.stringify(payload),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

export const sendBikeToStation = (stationUUID, payload) =>
  fetch(`/api/station/${stationUUID}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

export const getAllStations = () =>
  fetch('/api/station/all', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json().then(({ stations }) => stations));

export const getLoggedMember = () =>
  fetch('/api/member/me', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());
