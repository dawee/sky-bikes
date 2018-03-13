import './style.css';

const render = () => (props, node) => {
  node.classList.add('admin-page');

  return node;
};

const renderAdminPage = templates => {
  const update = render(templates);

  return (props, node) =>
    update(props, node || templates.get('admin-page').cloneNode(true));
};

export default renderAdminPage;
