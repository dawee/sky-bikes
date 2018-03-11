export const createUpdateHandler = () => {
  const handlers = {};

  return (name, node, eventName, handler) => {
    if (handler === handlers[name]) {
      return;
    }

    if (handlers[name]) {
      node.removeEventListener(eventName, handlers[name]);
    }

    if (handler) {
      node.addEventListener(eventName, handler);
      handlers[name] = handler;
    }
  };
};
