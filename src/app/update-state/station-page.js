import { hasCurrentMemberRent } from '../extract-state';
import { tryToRentBike } from '../action';

const formatStationSlot = (dispatch, getState) => slot => {
  let title;
  let onClick;
  let disabled = false;

  const empty = !slot;
  const hasBike = hasCurrentMemberRent(getState());

  if (!hasBike && !empty) {
    title = 'Book this bike';
    onClick = () => tryToRentBike(dispatch, getState)(slot);
  } else if (!hasBike && empty) {
    title = 'Empty slot';
    disabled = true;
  } else if (hasBike && empty) {
    title = 'Return your bike here';
  } else {
    title = 'This slot is taken';
    disabled = true;
  }

  return {
    ...slot,
    empty,
    cta: {
      disabled,
      title,
      onClick
    }
  };
};

const formatStation = (dispatch, getState) => station => ({
  ...station,
  slots: Object.keys(station).reduce((slots, slotId) => {
    const doFormatStationSlot = formatStationSlot(dispatch, getState);

    if (!slotId.startsWith('slot')) {
      return slots;
    }

    return { ...slots, [slotId]: doFormatStationSlot(station[slotId]) };
  }, {})
});

const updateStationPage = (dispatch, getState) => (
  state = { stations: [{ slots: {} }] },
  action
) => {
  switch (action.type) {
    case 'fetch-stations-success':
      return {
        ...state,
        stations: action.stations.map(formatStation(dispatch, getState))
      };
    default:
      return state;
  }
};

export default updateStationPage;
