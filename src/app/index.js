const component = () => {
  const element = document.createElement('div');

  element.innerHTML = 'Sky bikes';

  return element;
};

document.body.appendChild(component());
