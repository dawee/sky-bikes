const updateRegisterFirstName = (
  state = { placeholder: 'Enter your first name' }
) => ({
  ...state
});

const updateRegisterLastName = (
  state = { placeholder: 'Enter your last name' }
) => ({
  ...state
});

const updateRegisterEmergencyPhoneNumber = (
  state = { placeholder: 'Enter your emergency phone number' }
) => ({
  ...state
});

const updateRegisterEmail = (state = { placeholder: 'Enter your email' }) => ({
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
  state = { title: 'Sky Bikes!' },
  action,
  dispatch,
  getState
) => ({
  ...state,
  form: updateRegisterForm(state.form, action, dispatch, getState)
});

export default updateRegisterPage;
