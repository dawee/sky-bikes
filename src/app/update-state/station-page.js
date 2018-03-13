import { hasCurrentMemberRent } from '../extract-state';
import {
  tryToRentBike,
  openPreviousStation,
  openNextStation,
  returnBike,
  logout
} from '../action';

const formatStationSlot = (dispatch, getState) => (
  station,
  slotIndex,
  slot
) => {
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
    onClick = () => returnBike(dispatch, getState)(station.uuid, slotIndex);
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
  onClickPrevious: openPreviousStation(dispatch, getState),
  onClickNext: openNextStation(dispatch, getState),
  slots: Object.keys(station).reduce((slots, slotId) => {
    const doFormatStationSlot = formatStationSlot(dispatch, getState);

    if (!slotId.startsWith('slot')) {
      return slots;
    }

    return {
      ...slots,
      [slotId]: doFormatStationSlot(
        station,
        Number(slotId.match(/^slot([0-9]+)$/)[1]),
        station[slotId]
      )
    };
  }, {})
});

const updateStationPage = (dispatch, getState) => (
  state = {
    header: {
      logout: {
        title: 'Log out',
        onClick: logout(dispatch, getState)
      }
    },

    currentStationIndex: 0,
    stations: [{ slots: {} }]
  },
  action
) => {
  switch (action.type) {
    case 'set-station-index':
      return {
        ...state,
        currentStationIndex: action.index
      };
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
