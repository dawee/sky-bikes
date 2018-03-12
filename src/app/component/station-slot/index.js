import { createUpdateHandler } from '../../handler';
import './style.css';

const render = () => {
  const updateHandler = createUpdateHandler();

  return (props, node) => {
    const { slotId, color, rent } = props;
    const bike = node.querySelector('.bike');
    const button = node.querySelector('button');

    node.classList.add('slot');
    node.classList.add(slotId);

    if (color) {
      node.classList.remove('empty');
      button.textContent = rent.title;
      bike.style.backgroundColor = color;
    } else {
      button.textContent = 'Empty slot';
      node.classList.add('empty');
      bike.style.backgroundColor = null;
    }

    updateHandler('reserveClick', button, 'click', rent.onClick);

    return node;
  };
};

const renderStationSlot = templates => {
  const update = render(templates);

  return (props, node) =>
    update(props, node || templates.get('station-slot').cloneNode(true));
};

export default renderStationSlot;
