import renderRenting from '../renting';
import './style.css';

const render = templates => {
  const rentingComponent = renderRenting(templates);

  return (props, node) => {
    const { renting } = props;
    const contentNode = node.querySelector('.content');
    const rentingNode = contentNode.querySelector('.renting');

    node.classList.add('renting-page');

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
