import './style.css';

const render = () => (props, node) => {
  const { slotId, color, reserve } = props;
  const bike = node.querySelector('.bike');
  const button = node.querySelector('button');

  node.classList.add('slot');
  node.classList.add(slotId);
  button.textContent = reserve.title;
  bike.style.backgroundColor = color;

  return node;
};

const renderStationSlot = templates => (props, node) =>
  render(templates)(
    props,
    node || templates.get('station-slot').cloneNode(true)
  );

export default renderStationSlot;
