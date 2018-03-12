import renderLoginForm from '../login-form';
import './style.css';

const render = templates => (props, node) => {
  const { title, form } = props;
  const loginForm = renderLoginForm(templates);
  const contentNode = node.querySelector('.content');
  const formNode = contentNode.querySelector('.login-form');

  let titleNode = contentNode.querySelector('h1');

  node.classList.add('login-page');

  if (!titleNode) {
    titleNode = document.createElement('h1');
    contentNode.appendChild(titleNode);
  }

  titleNode.textContent = title;

  if (formNode) {
    loginForm(form, formNode);
  } else {
    contentNode.appendChild(loginForm(form));
  }

  return node;
};

const renderLoginPage = templates => {
  const update = render(templates);

  return (props, node) =>
    update(props, node || templates.get('page').cloneNode(true));
};

export default renderLoginPage;
