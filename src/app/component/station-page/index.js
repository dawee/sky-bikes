import renderStation from '../station';
import renderHeader from '../header';
import './style.css';

const render = templates => {
  const header = renderHeader(templates);
  const station = renderStation(templates);

  return (props, node) => {
    const { header: headerProps, currentStationIndex, stations } = props;
    const contentNode = node.querySelector('.content');
    const headerNode = contentNode.querySelector('.header');
    const stationNode = contentNode.querySelector('.station');

    node.classList.add('station-page');

    if (headerNode) {
      header(headerProps, headerNode);
    } else {
      contentNode.appendChild(header(headerProps));
    }

    if (stationNode) {
      station(stations[currentStationIndex], stationNode);
    } else {
      contentNode.appendChild(station(stations[currentStationIndex]));
    }

    return node;
  };
};

const renderStationPage = templates => {
  const update = render(templates);
  return (props, node) =>
    update(props, node || templates.get('page').cloneNode(true));
};

export default renderStationPage;
