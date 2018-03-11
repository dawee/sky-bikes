import renderLoginPage from './component/login-page';
import updateState from './update-state';
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

const createUpdateRoot = (root, node) => state => root(state, node);

const createRootNode = () => {
  let updateRoot;

  const templates = consumeTemplates();
  const loginPage = renderLoginPage(templates);

  let state = {};
  const getState = () => state;

  const dispatch = action =>
    new Promise(resolve => {
      setTimeout(() => {
        state = updateState(state, action, dispatch, getState);
        updateRoot(state);
        resolve(action);
      }, 0);
    });

  state = updateState(state, { type: 'init' }, dispatch, getState);

  const rootNode = loginPage(state);

  updateRoot = createUpdateRoot(loginPage, rootNode);

  return rootNode;
};

document.body.appendChild(createRootNode());
