export const createSession = payload =>
  fetch('/api/session', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
