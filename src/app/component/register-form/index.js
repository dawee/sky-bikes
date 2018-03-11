import './style.css';

const render = () => {
  return (props, node) => {
    return node;
  };
};

const renderRegisterForm = templates => (props, node) =>
  render(templates)(
    props,
    node || templates.get('register-form').cloneNode(true)
  );

export default renderRegisterForm;
