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
  fetch('/api/reservation', {
    method: 'POST',
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
