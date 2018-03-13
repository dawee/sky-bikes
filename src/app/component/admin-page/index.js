import './style.css';

const render = () => (props, node) => {
  const { stations } = props;
  const stationsListBodyNode = node.querySelector('.station-slots-list tbody');

  node.classList.add('admin-page');
  stationsListBodyNode.childNodes.forEach(child =>
    stationsListBodyNode.removeChild(child)
  );

  stations.forEach(station => {
    Object.keys(station).forEach(slotId => {
      if (!slotId.startsWith('slot')) {
        return;
      }

      const slot = station[slotId];
      const lineNode = document.createElement('tr');
      const nameNode = document.createElement('td');
      const slotNode = document.createElement('td');
      const bikeNode = document.createElement('td');

      nameNode.textContent = station.name;
      slotNode.textContent = slotId;
      bikeNode.textContent =
        slot && slot.color ? `Bike (${slot.color})` : 'Empty';
      bikeNode.style.color = slot && slot.color ? slot.color : 'inherit';

      lineNode.appendChild(nameNode);
      lineNode.appendChild(slotNode);
      lineNode.appendChild(bikeNode);
      stationsListBodyNode.appendChild(lineNode);
    });
  });

  return node;
};

const renderAdminPage = templates => {
  const update = render(templates);

  return (props, node) =>
    update(props, node || templates.get('admin-page').cloneNode(true));
};

export default renderAdminPage;
