import './style.css';

const render = () => (props, node) => {
  const { placeholder, submit } = props;

  node.classList.add('login-form');
  node.querySelector('.email').setAttribute('placeholder', placeholder);
  node.querySelector('.submit').setAttribute('value', submit.title);

  return node;
};

const renderLoginForm = templates => (props, node) =>
  render(templates)(props, node || templates.get('login-form').cloneNode(true));

export default renderLoginForm;
