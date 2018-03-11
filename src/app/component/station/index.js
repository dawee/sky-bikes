const render = () => (props, node) => {
  node.classList.add('station');

  return node;
};

const renderStation = templates => (props, node) =>
  render(templates)(props, node || templates.get('station').cloneNode(true));

export default renderStation;
