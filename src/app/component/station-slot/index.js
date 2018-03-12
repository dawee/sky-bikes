import { createUpdateHandler } from '../../handler';
import './style.css';

const render = () => {
  const updateHandler = createUpdateHandler();

  return (props, node) => {
    const { slotId, empty, color, cta } = props;
    const bike = node.querySelector('.bike');
    const button = node.querySelector('button');

    node.classList.add('slot');
    node.classList.add(slotId);

    if (color) {
      bike.style.backgroundColor = color;
    } else {
      bike.style.backgroundColor = null;
    }

    button.textContent = cta.title;

    if (cta.disabled) {
      button.classList.add('disabled');
    } else {
      button.classList.remove('disabled');
    }

    if (empty) {
      node.classList.add('empty');
    } else {
      node.classList.remove('empty');
    }

    updateHandler('reserveClick', button, 'click', cta.onClick);

    return node;
  };
};

const renderStationSlot = templates => {
  const update = render(templates);

  return (props, node) =>
    update(props, node || templates.get('station-slot').cloneNode(true));
};

export default renderStationSlot;
