const updateRegisterFirstName = (state = {}) => ({
  ...state
});

const updateRegisterLastName = (state = {}) => ({
  ...state
});

const updateRegisterEmergencyPhoneNumber = (state = {}) => ({
  ...state
});

const updateRegisterEmail = (state = {}) => ({
  ...state
});

const updateRegisterForm = (
  state = {
    submit: {
      title: 'Create an account',
      handler: event => {
        event.preventDefault();
      }
    }
  },
  action,
  dispatch,
  getState
) => ({
  ...state,
  firstName: updateRegisterFirstName(
    state.firstName,
    action,
    dispatch,
    getState
  ),
  lastName: updateRegisterLastName(state.lastName, action, dispatch, getState),
  emergencyPhoneNumber: updateRegisterEmergencyPhoneNumber(
    state.emergencyPhoneNumber,
    action,
    dispatch,
    getState
  ),
  email: updateRegisterEmail(state.email, action, dispatch, getState)
});

const updateRegisterPage = (
  state = { title: 'Sky Bikes' },
  action,
  dispatch,
  getState
) => ({
  ...state,
  form: updateRegisterForm(state.form, action, dispatch, getState)
});

export default updateRegisterPage;
