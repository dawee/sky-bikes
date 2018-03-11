import { getLoginFormEmail } from '../extract-state';
import * as service from '../service';

const updateLoginFormEmail = dispatch => (
  state = {
    placeholder: 'Enter your email',
    value: '',
    onInput: event =>
      dispatch({
        type: 'login-form-email-update',
        value: event.target.value
      })
  },
  action
) => {
  switch (action.type) {
    case 'login-form-email-update':
      return { ...state, value: action.value };
    default:
      return state;
  }
};

const updateLoginForm = (dispatch, getState) => (
  state = {
    submit: {
      title: 'Log in',
      handler: event => {
        event.preventDefault();
        service.createSession({ email: getLoginFormEmail(getState()) });
      }
    }
  },
  action
) => ({
  ...state,
  email: updateLoginFormEmail(dispatch, getState)(state.email, action)
});

const updateLoginPage = (dispatch, getState) => (
  state = { title: 'Sky Bikes!' },
  action = {}
) => ({
  ...state,
  form: updateLoginForm(dispatch, getState)(state.form, action)
});

export default updateLoginPage;
