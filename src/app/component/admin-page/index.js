import './style.css';

const render = () => (props, node) => {
  const { members, stations } = props;
  const stationsListBodyNode = node.querySelector('.station-slots-list tbody');
  const membersListBodyNode = node.querySelector('.members-list tbody');

  node.classList.add('admin-page');

  stationsListBodyNode.childNodes.forEach(child =>
    stationsListBodyNode.removeChild(child)
  );

  membersListBodyNode.childNodes.forEach(child =>
    membersListBodyNode.removeChild(child)
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

  members.forEach(member => {
    const lineNode = document.createElement('tr');
    const lastNameNode = document.createElement('td');
    const firstNameNode = document.createElement('td');
    const emailNode = document.createElement('td');
    const emergencyPhoneNumberNode = document.createElement('td');
    const bikeNode = document.createElement('td');
    const timeLeftNode = document.createElement('td');
    const bannedNode = document.createElement('td');

    lastNameNode.textContent = member.lastName;
    firstNameNode.textContent = member.firstName;
    emailNode.textContent = member.email;
    emergencyPhoneNumberNode.textContent = member.emergencyPhoneNumber;
    bikeNode.textContent = member.bike
      ? `Bike (${member.bike.color})`
      : 'Empty';
    bikeNode.style.color =
      member.bike && member.bike.color ? member.bike.color : 'inherit';

    timeLeftNode.textContent = member.bike
      ? member.rentingHoursLeft * 2000
      : 'N/A';
    bannedNode.textContent = member.banned ? 'Yes' : 'No';

    lineNode.appendChild(lastNameNode);
    lineNode.appendChild(firstNameNode);
    lineNode.appendChild(emailNode);
    lineNode.appendChild(emergencyPhoneNumberNode);
    lineNode.appendChild(bikeNode);
    lineNode.appendChild(timeLeftNode);
    lineNode.appendChild(bannedNode);

    membersListBodyNode.appendChild(lineNode);
  });

  return node;
};

const renderAdminPage = templates => {
  const update = render(templates);

  return (props, node) =>
    update(props, node || templates.get('admin-page').cloneNode(true));
};

export default renderAdminPage;
