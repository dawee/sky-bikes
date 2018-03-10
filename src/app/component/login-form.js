const render = (node, props) => {
  const {placeholder} = props;

  node.querySelector('input').setAttribute('placeholder', placeholder);

  return node;
};

const renderLoginForm = templates => (props, node) =>
  render(node || templates.get('login-form').cloneNode(true), props);

export default renderLoginForm;
