import { getLoginFormEmail } from './extract-state';
import * as service from './service';

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

const updateLoginForm = (state, action, dispatch, getState) => ({
  email: updateLoginFormEmail(state, action, dispatch, getState),
  submit: {
    title: 'Log in',
    handler: event => {
      event.preventDefault();
      service.createSession({ email: getLoginFormEmail(getState()) });
    }
  }
});

const updateState = (state, action, dispatch, getState) => ({
  title: 'Sky Bikes',
  form: updateLoginForm(state.form, action, dispatch, getState)
});

export default updateState;
