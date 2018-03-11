import renderLoginPage from './component/login-page';
import './style.css';

const consumeTemplates = () => {
  const nodes = document.querySelectorAll('[data-type="template"]');

  return Array.prototype.slice.call(nodes).reduce((map, node) => {
    const templateName = node.getAttribute('data-template-name');

    document.body.removeChild(node);

    node.removeAttribute('data-type');
    node.removeAttribute('data-template-name');

    return map.set(templateName, node);
  }, new Map());
};

const root = () => {
  const templates = consumeTemplates();
  const loginPage = renderLoginPage(templates);

  return loginPage({
    title: 'Sky Bikes',
    form: {
      placeholder: 'example: my.email@gmail.com',
      submit: {
        title: 'Log in'
      }
    }
  });
};

document.body.appendChild(root());
