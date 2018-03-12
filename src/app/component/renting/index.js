import './style.css';

const render = () => (props, node) => {
  const { bikeColor, rentingSentence, timeSentence, returnBike } = props;
  const bikeNode = node.querySelector('.bike');
  const rentingSentenceNode = node.querySelector('.renting-sentence');
  const timeSentenceNode = node.querySelector('.time-sentence');
  const returnBikeNode = node.querySelector('.return-bike');

  node.classList.add('renting');
  rentingSentenceNode.textContent = rentingSentence;

  Object.keys(timeSentence).forEach(partName => {
    timeSentenceNode.querySelector(`.${partName}`).textContent =
      timeSentence[partName];
  });

  bikeNode.style.fill = bikeColor;
  returnBikeNode.textContent = returnBike.title;

  return node;
};

const renderRenting = templates => {
  const update = render(templates);
  return (props, node) =>
    update(props, node || templates.get('renting').cloneNode(true));
};

export default renderRenting;
