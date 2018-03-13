import renderHeader from '../header';
import renderRenting from '../renting';
import './style.css';

const render = templates => {
  const header = renderHeader(templates);
  const rentingComponent = renderRenting(templates);

  return (props, node) => {
    const { header: headerProps, renting } = props;
    const contentNode = node.querySelector('.content');
    const headerNode = contentNode.querySelector('.header');
    const rentingNode = contentNode.querySelector('.renting');

    node.classList.add('renting-page');

    if (headerNode) {
      header(headerProps, headerNode);
    } else {
      contentNode.appendChild(header(headerProps));
    }

    if (rentingNode) {
      rentingComponent(renting, rentingNode);
    } else {
      contentNode.appendChild(rentingComponent(renting));
    }

    return node;
  };
};

const renderRentingPage = templates => {
  const update = render(templates);
  return (props, node) =>
    update(props, node || templates.get('page').cloneNode(true));
};

export default renderRentingPage;
