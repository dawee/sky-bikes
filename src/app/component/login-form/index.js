import './style.css';

const render = () => {
  let submitHandler = null;

  return (props, node) => {
    const { placeholder, submit } = props;
    const formNode = node.querySelector('form');
    const emailNode = node.querySelector('.email');
    const submitNode = node.querySelector('.submit');

    node.classList.add('login-form');
    emailNode.setAttribute('placeholder', placeholder);
    submitNode.setAttribute('value', submit.title);

    if (submitHandler) {
      formNode.removeEventListener('submit', submitHandler);
    }

    if (submit.handler) {
      formNode.addEventListener('submit', submit.handler);
      submitHandler = submit.handler;
    }

    return node;
  };
};

const renderLoginForm = templates => (props, node) =>
  render(templates)(props, node || templates.get('login-form').cloneNode(true));

export default renderLoginForm;
