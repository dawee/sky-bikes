import { createUpdateHandler } from '../../handler';
import './style.css';

const render = () => {
  const updateHandler = createUpdateHandler();

  return (props, node) => {
    const {
      email,
      emergencyPhoneNumber: phoneNumber,
      firstName,
      lastName,
      submit
    } = props;

    const formNode = node.querySelector('form');
    const emailNode = node.querySelector('.email');
    const firstNameNode = node.querySelector('.first-name');
    const lastNameNode = node.querySelector('.last-name');
    const phoneNumberNode = node.querySelector('.emergency-phone-number');
    const submitNode = node.querySelector('.submit');

    node.classList.add('register-form');

    firstNameNode.setAttribute('placeholder', firstName.placeholder);
    firstNameNode.setAttribute('value', firstName.value);
    updateHandler('firstNameInput', firstNameNode, 'input', firstName.onInput);

    // Last name
    lastNameNode.setAttribute('placeholder', lastName.placeholder);
    lastNameNode.setAttribute('value', lastName.value);
    updateHandler('lastNameInput', lastNameNode, 'input', lastName.onInput);

    // Emergency Phone Number
    phoneNumberNode.setAttribute('placeholder', phoneNumber.placeholder);
    phoneNumberNode.setAttribute('value', phoneNumber.value);
    updateHandler(
      'phoneNumberInput',
      phoneNumberNode,
      'input',
      phoneNumber.onInput
    );

    // Email
    emailNode.setAttribute('placeholder', email.placeholder);
    emailNode.setAttribute('value', email.value);
    updateHandler('emailInput', emailNode, 'input', email.onInput);

    submitNode.setAttribute('value', submit.title);
    updateHandler('formSubmit', formNode, 'submit', submit.handler);

    return node;
  };
};

const renderRegisterForm = templates => {
  const update = render(templates);
  return (props, node) =>
    update(props, node || templates.get('register-form').cloneNode(true));
};

export default renderRegisterForm;
