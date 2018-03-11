import { createUpdateHandler } from '../../handler';
import './style.css';

const render = () => {
  const updateHandler = createUpdateHandler();

  return (props, node) => {
    const { email, emergencyPhoneNumber, firstName, lastName, submit } = props;

    const formNode = node.querySelector('form');
    const emailNode = node.querySelector('.email');
    const firstNameNode = node.querySelector('.first-name');
    const lastNameNode = node.querySelector('.last-name');
    const emergencyPhoneNumberNode = node.querySelector(
      '.emergency-phone-number'
    );
    const submitNode = node.querySelector('.submit');

    node.classList.add('register-form');
    firstNameNode.setAttribute('placeholder', firstName.placeholder);
    lastNameNode.setAttribute('placeholder', lastName.placeholder);
    emergencyPhoneNumberNode.setAttribute(
      'placeholder',
      emergencyPhoneNumber.placeholder
    );
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
