import renderStation from '../station';
import './style.css';

const render = templates => (props, node) => {
  const station = renderStation(templates);
  const contentNode = node.querySelector('.content');
  const stationNode = contentNode.querySelector('.station');

  node.classList.add('station-page');

  if (stationNode) {
    station(props.stations[0], stationNode);
  } else {
    contentNode.appendChild(station(props.stations[0]));
  }

  return node;
};

const renderStationPage = templates => (props, node) =>
  render(templates)(props, node || templates.get('page').cloneNode(true));

export default renderStationPage;
