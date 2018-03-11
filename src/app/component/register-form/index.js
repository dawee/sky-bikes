import { createUpdateHandler } from '../../handler';
import './style.css';

const render = () => {
  const updateHandler = createUpdateHandler();

  return (props, node) => {
    const { email, submit } = props;

    const formNode = node.querySelector('form');
    const emailNode = node.querySelector('.email');
    const submitNode = node.querySelector('.submit');

    node.classList.add('register-form');
    emailNode.setAttribute('placeholder', email.placeholder);
    submitNode.setAttribute('value', submit.title);

    updateHandler('formSubmit', formNode, 'submit', submit.handler);
    updateHandler('emailInput', emailNode, 'input', email.onInput);

    return node;
  };
};

const renderRegisterForm = templates => (props, node) =>
  render(templates)(
    props,
    node || templates.get('register-form').cloneNode(true)
  );

export default renderRegisterForm;
