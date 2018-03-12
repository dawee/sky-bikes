import renderStationSlot from '../station-slot';
import './style.css';

// Bike SVG path credits to : Federico Panzano (the noun project)

const render = templates => (props, node) => {
  const { slots } = props;
  const stationSlot = renderStationSlot(templates);
  const slotsNode = node.querySelector('.slots');

  node.classList.add('station');

  Object.keys(slots).forEach(slotId => {
    const slot = slots[slotId];
    const slotNode = node.querySelector(`.${slotId}`);

    if (slotNode) {
      stationSlot({ ...slot, slotId }, slotNode);
    } else {
      slotsNode.appendChild(stationSlot({ ...slot, slotId }));
    }
  });

  return node;
};

const renderStation = templates => {
  const update = render(templates);

  return (props, node) =>
    update(props, node || templates.get('station').cloneNode(true));
};

export default renderStation;
