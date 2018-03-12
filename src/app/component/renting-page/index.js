import './style.css';

const render = () => (props, node) => {
  node.classList.add('renting-page');
  return node;
};

const renderRentingPage = templates => {
  const update = render(templates);
  return (props, node) =>
    update(props, node || templates.get('page').cloneNode(true));
};

export default renderRentingPage;
