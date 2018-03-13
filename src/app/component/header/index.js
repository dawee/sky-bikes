import './style.css';

const render = () => (props, node) => {
  node.classList.add('header');

  node.querySelector('.title').textContent = 'Sky Bikes!';

  return node;
};

const renderLoginPage = templates => {
  const update = render(templates);

  return (props, node) =>
    update(props, node || templates.get('header').cloneNode(true));
};

export default renderLoginPage;
