import { getLoginFormEmail } from '../extract-state';
import * as service from '../service';

const updateLoginFormEmail = (
  state = {
    placeholder: 'example: my.email@gmail.com',
    value: '',
    onInput: event =>
      dispatch({
        type: 'login-form-email-update',
        value: event.target.value
      })
  },
  action,
  dispatch
) => {
  switch (action.type) {
    case 'login-form-email-update':
      return { ...state, value: action.value };
    default:
      return state;
  }
};

const updateLoginForm = (
  state = {
    submit: {
      title: 'Log in',
      handler: event => {
        event.preventDefault();
        service.createSession({ email: getLoginFormEmail(getState()) });
      }
    }
  },
  action,
  dispatch,
  getState
) => ({
  ...state,
  email: updateLoginFormEmail(state.email, action, dispatch, getState)
});

const updateLoginPage = (
  state = { title: 'Sky Bikes' },
  action,
  dispatch,
  getState
) => ({
  ...state,
  form: updateLoginForm(state.form, action, dispatch, getState)
});

export default updateLoginPage;
