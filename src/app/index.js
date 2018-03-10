import renderLoginForm from './component/login-form';

const consumeTemplates = () => {
  const nodes = document.querySelectorAll('[data-type="template"]');

  return Array.prototype.slice.call(nodes).reduce((map, node) => {
    document.body.removeChild(node);

    return map.set(node.getAttribute('data-name'), node);
  }, new Map());
};

const root = () => {
  const templates = consumeTemplates();
  const loginForm = renderLoginForm(templates);

  return loginForm({placeholder: 'example: my.email@gmail.com'});
};

document.body.appendChild(root());
