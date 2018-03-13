import updateAdminPage from './admin-page';
import updateLoginPage from './login-page';
import updateRegisterPage from './register-page';
import updateRentingPage from './renting-page';
import updateStationPage from './station-page';

export const PAGES = {
  admin: updateAdminPage,
  login: updateLoginPage,
  register: updateRegisterPage,
  renting: updateRentingPage,
  station: updateStationPage
};

const updateState = (dispatch, getState) => (
  state = {
    members: {}
  },
  action
) => {
  const member = action.member;
  const updatePage = (page, action, pageState) =>
    PAGES[page](dispatch, getState)(pageState, action);

  switch (action.type) {
    case 'navigate':
      return {
        ...state,
        currentPage: action.page,
        page: updatePage(action.page, action)
      };
    case 'fetch-member-success':
      return {
        ...state,
        members: { ...state.members, [member.uuid]: member }
      };
    case 'set-current-member':
      return {
        ...state,
        currentMemberUUID: member.uuid
      };
    case 'set-renting-hours-left':
      return {
        ...state,
        members: {
          ...state.members,
          [action.memberUUID]: {
            ...state.members[action.memberUUID],
            rentingHoursLeft: action.rentingHoursLeft
          }
        }
      };
    default:
      return state.currentPage
        ? { ...state, page: updatePage(state.currentPage, action, state.page) }
        : state;
  }
};

export default updateState;
