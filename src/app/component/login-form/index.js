import { createUpdateHandler } from '../../handler';
import './style.css';

const render = () => {
  const updateHandler = createUpdateHandler();

  return (props, node) => {
    const { email, submit } = props;
    const formNode = node.querySelector('form');
    const emailNode = node.querySelector('.email');
    const submitNode = node.querySelector('.submit');
    const registerLinkNode = node.querySelector('.register-link');

    node.classList.add('login-form');
    emailNode.setAttribute('placeholder', email.placeholder);
    emailNode.setAttribute('value', email.value);
    submitNode.setAttribute('value', submit.title);
    registerLinkNode.querySelector('.sentence').textContent =
      'No account yet ?';
    registerLinkNode.querySelector('a').textContent = 'Click here to register';
    registerLinkNode.querySelector('a').setAttribute('href', '/register');

    updateHandler('formSubmit', formNode, 'submit', submit.handler);
    updateHandler('emailInput', emailNode, 'input', email.onInput);
    updateHandler('emailChange', emailNode, 'change', email.onChange);

    return node;
  };
};

const renderLoginForm = templates => {
  const update = render(templates);

  return (props, node) =>
    update(props, node || templates.get('login-form').cloneNode(true));
};

export default renderLoginForm;
