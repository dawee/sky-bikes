import renderLoginPage from './login-page';

const render = templates => {
  const pages = {
    login: renderLoginPage(templates)
  };

  let lastPage = null;
  let pageNode = null;

  return (props, node) => {
    const { currentPage, page } = props;

    if (lastPage && currentPage !== lastPage) {
      node.removeChild(pageNode);
      pageNode = null;
    }

    pageNode = pages[currentPage](page, pageNode);

    if (currentPage && currentPage !== lastPage) {
      node.appendChild(pageNode);
    }

    lastPage = currentPage;

    return node;
  };
};

const renderRouter = templates => (props, node) =>
  render(templates)(props, node || document.createElement('div'));

export default renderRouter;
