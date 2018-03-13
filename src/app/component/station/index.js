import { createUpdateHandler } from '../../handler';
import renderStationSlot from '../station-slot';
import './style.css';

// Bike SVG path credits to : Federico Panzano (the noun project)

const render = templates => {
  const updateHandler = createUpdateHandler();
  const stationSlot = renderStationSlot(templates);

  return (props, node) => {
    const { name, slots, onClickPrevious, onClickNext } = props;
    const slotsNode = node.querySelector('.slots');
    const nameNode = node.querySelector('.name');
    const previousNode = node.querySelector('.nav-previous');
    const nextNode = node.querySelector('.nav-next');

    updateHandler('previousNode', previousNode, 'click', onClickPrevious);
    updateHandler('nextNode', nextNode, 'click', onClickNext);

    node.classList.add('station');
    nameNode.textContent = name;

    Object.keys(slots).forEach((slotId, slotIndex) => {
      const slot = slots[slotId];
      const slotNode = node.querySelector(`.${slotId}`);

      if (slotNode) {
        stationSlot({ ...slot, slotId, slotIndex }, slotNode);
      } else {
        slotsNode.appendChild(stationSlot({ ...slot, slotId }));
      }
    });

    return node;
  };
};

const renderStation = templates => {
  const update = render(templates);

  return (props, node) =>
    update(props, node || templates.get('station').cloneNode(true));
};

export default renderStation;
