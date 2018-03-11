import './style.css';

const render = () => (props, node) => {
  node.classList.add('station-page');

  return node;
};

const renderStationPage = templates => (props, node) =>
  render(templates)(props, node || templates.get('page').cloneNode(true));

export default renderStationPage;
