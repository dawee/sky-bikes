import renderStation from '../station';
import './style.css';

const render = templates => (props, node) => {
  const { currentStationIndex, stations } = props;
  const station = renderStation(templates);
  const contentNode = node.querySelector('.content');
  const stationNode = contentNode.querySelector('.station');

  node.classList.add('station-page');

  if (stationNode) {
    station(stations[currentStationIndex], stationNode);
  } else {
    contentNode.appendChild(station(stations[currentStationIndex]));
  }

  return node;
};

const renderStationPage = templates => {
  const update = render(templates);
  return (props, node) =>
    update(props, node || templates.get('page').cloneNode(true));
};

export default renderStationPage;
