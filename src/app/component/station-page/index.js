import renderStation from '../station';
import './style.css';

const render = templates => (props, node) => {
  const station = renderStation(templates);
  const contentNode = node.querySelector('.content');
  const stationNode = contentNode.querySelector('h1');

  node.classList.add('station-page');

  if (stationNode) {
    station(props.station, stationNode);
  } else {
    contentNode.appendChild(station(props.station));
  }

  return node;
};

const renderStationPage = templates => (props, node) =>
  render(templates)(props, node || templates.get('page').cloneNode(true));

export default renderStationPage;
