import renderRegisterForm from '../register-form';
import './style.css';

const render = templates => (props, node) => {
  const { title, form } = props;
  const registerForm = renderRegisterForm(templates);
  const contentNode = node.querySelector('.content');
  const formNode = contentNode.querySelector('.register-form');

  let titleNode = contentNode.querySelector('h1');

  node.classList.add('register-page');

  if (!titleNode) {
    titleNode = document.createElement('h1');
    contentNode.appendChild(titleNode);
  }

  titleNode.textContent = title;

  if (formNode) {
    registerForm(form, formNode);
  } else {
    contentNode.appendChild(registerForm(form));
  }

  return node;
};

const renderRegisterPage = templates => (props, node) =>
  render(templates)(props, node || templates.get('page').cloneNode(true));

export default renderRegisterPage;
