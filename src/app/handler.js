export const createUpdateHandler = () => {
  let handlers = [];

  return (name, node, eventName, handler) => {
    let nodeHandlers = handlers.find(
      ({ node: handlersNode }) => handlersNode === node
    );

    if (!nodeHandlers) {
      nodeHandlers = { node };
      handlers = handlers.concat([nodeHandlers]);
    }

    if (nodeHandlers[name]) {
      node.removeEventListener(eventName, nodeHandlers[name]);
    }

    if (handler) {
      node.addEventListener(eventName, handler);
      nodeHandlers[name] = handler;
    }
  };
};
