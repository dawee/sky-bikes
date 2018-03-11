const forwardInputValue = (actionType, dispatch) => event =>
  dispatch({
    type: actionType,
    value: event.target.value
  });

const createInputUpdater = ({ placeholder, actionType }) => dispatch => (
  state = {
    placeholder,
    onInput: forwardInputValue(actionType, dispatch),
    value: ''
  },
  action
) => {
  switch (action.type) {
    case actionType:
      return { ...state, value: action.value };
    default:
      return state;
  }
};

const updateRegisterEmail = createInputUpdater({
  actionType: 'register-form-email-update',
  placeholder: 'Enter your email'
});

const updateRegisterFirstName = createInputUpdater({
  actionType: 'register-form-first-name-update',
  placeholder: 'Enter your first name'
});

const updateRegisterLastName = createInputUpdater({
  actionType: 'register-form-last-name-update',
  placeholder: 'Enter your last name'
});

const updateRegisterEmergencyPhoneNumber = createInputUpdater({
  actionType: 'register-form-phone-number-update',
  placeholder: 'Enter your emergency phone number'
});

const updateRegisterForm = (dispatch, getState) => (
  state = {
    submit: {
      title: 'Create an account',
      handler: event => {
        event.preventDefault();
      }
    }
  },
  action
) => ({
  ...state,
  firstName: updateRegisterFirstName(dispatch, getState)(
    state.firstName,
    action
  ),
  lastName: updateRegisterLastName(dispatch, getState)(state.lastName, action),
  emergencyPhoneNumber: updateRegisterEmergencyPhoneNumber(dispatch, getState)(
    state.emergencyPhoneNumber,
    action
  ),
  email: updateRegisterEmail(dispatch, getState)(state.email, action)
});

const updateRegisterPage = (dispatch, getState) => (
  state = { title: 'Sky Bikes!' },
  action = {}
) => ({
  ...state,
  form: updateRegisterForm(dispatch, getState)(state.form, action)
});

export default updateRegisterPage;
