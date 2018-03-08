function component() {
  var element = document.createElement('div');

  element.innerHTML = 'Sky bikes';

  return element;
}

document.body.appendChild(component());
