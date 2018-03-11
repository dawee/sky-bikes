import renderRouter from './component/router';
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
  let rootNode;
  let state;
  let updateRoot;
  let updateAndDispatch;

  const templates = consumeTemplates();
  const router = renderRouter(templates);

  const dispatch = action =>
    new Promise(resolve => {
      setTimeout(() => {
        state = updateAndDispatch(state, action);

        updateRoot(state);
        resolve(action);

        // eslint-disable-next-line no-undef
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(`%c${action.type}`, 'color: #5f27cd', { action, state });
        }
      }, 0);
    });

  updateAndDispatch = updateState(dispatch, () => state);
  state = updateAndDispatch(state, { type: 'init' });
  rootNode = router(state);
  updateRoot = createUpdateRoot(router, rootNode);

  return dispatch({ type: 'navigate', page: 'register' }).then(() => rootNode);
};

createRootNode().then(rootNode => document.body.appendChild(rootNode));
