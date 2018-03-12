import renderLoginPage from './login-page';
import renderRegisterPage from './register-page';
import renderRentingPage from './renting-page';
import renderStationPage from './station-page';

const render = templates => {
  const pages = {
    login: renderLoginPage(templates),
    register: renderRegisterPage(templates),
    renting: renderRentingPage(templates),
    station: renderStationPage(templates)
  };

  let lastPage = null;
  let pageNode = null;

  return (props, node) => {
    const { currentPage, page, onOpenPage } = props;

    if (lastPage && currentPage !== lastPage) {
      node.removeChild(pageNode);
      pageNode = null;
    }

    if (currentPage) {
      pageNode = pages[currentPage](page, pageNode);
    }

    if (currentPage && currentPage !== lastPage) {
      node.appendChild(pageNode);
      onOpenPage(currentPage);
    }

    lastPage = currentPage;

    return node;
  };
};

const renderRouter = templates => {
  const update = render(templates);

  return (props, node) => update(props, node || document.createElement('div'));
};

export default renderRouter;
