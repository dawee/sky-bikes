import { createUpdateHandler } from '../../handler';
import './style.css';

const render = () => {
  const updateHandler = createUpdateHandler();

  return (props, node) => {
    const { logout } = props;
    const logoutNode = node.querySelector('.logout');

    node.classList.add('header');
    node.querySelector('.title').textContent = 'Sky Bikes!';
    logoutNode.textContent = logout.title;
    updateHandler('logoutClick', logoutNode, 'click', logout.onClick);

    return node;
  };
};

const renderLoginPage = templates => {
  const update = render(templates);

  return (props, node) =>
    update(props, node || templates.get('header').cloneNode(true));
};

export default renderLoginPage;
