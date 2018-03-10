const test = require('ava');
const createContext = require('./helper/context');

test('should see all stations with their initial bycicles when no one made a reservation', async t => {
  const { get } = await createContext(null, { role: 'admin' });
  const res = await get('/api/station/all');

  t.is(res.status, 200);
  t.is(res.body.stations[0].slot0.color, '#9400D3');
  t.is(res.body.stations[0].slot1.color, '#4B0082');
  t.is(res.body.stations[0].slot2.color, '#0000FF');
  t.is(res.body.stations[0].slot3.color, '#00FF00');
  t.is(res.body.stations[0].slot4.color, '#FFFF00');
  t.is(res.body.stations[0].slot5.color, '#FF7F00');
  t.is(res.body.stations[0].slot6.color, '#FF0000');
});
