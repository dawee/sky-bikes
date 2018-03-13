import renderRegisterForm from '../register-form';
import './style.css';

const render = templates => {
  const registerForm = renderRegisterForm(templates);

  return (props, node) => {
    const { title, form } = props;
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
};

const renderRegisterPage = templates => {
  const update = render(templates);
  return (props, node) =>
    update(props, node || templates.get('page').cloneNode(true));
};

export default renderRegisterPage;
