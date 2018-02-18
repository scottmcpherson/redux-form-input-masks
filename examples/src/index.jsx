import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { HashRouter, Route, Switch } from 'react-router-dom';

const dest = document.getElementById('content');
const reducer = combineReducers({
  form: reduxFormReducer,
});
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer);

let render = () => {
  /* eslint-disable */
  const PageNotFound = require('./App/PageNotFound.jsx').default;
  const GettingStarted = require('./GettingStarted/GettingStarted.jsx').default;
  const CreateNumberMask = require('./CreateNumberMask/CreateNumberMask.jsx')
    .default;
  const MoreExamples = require('./MoreExamples/MoreExamples.jsx').default;
  /* eslint-enable */
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={GettingStarted} />
          <Route exact path="/number-mask" component={CreateNumberMask} />
          <Route exact path="/more" component={MoreExamples} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </HashRouter>
    </Provider>,
    dest,
  );
};

if (module.hot) {
  const renderApp = render;

  render = () => {
    renderApp();
  };

  const rerender = () => {
    setTimeout(render);
  };

  module.hot.accept('./App/App.jsx', rerender);
  module.hot.accept('./App/PageNotFound.jsx', rerender);
  module.hot.accept('./GettingStarted/GettingStarted.jsx', rerender);
  module.hot.accept('./GettingStarted/GettingStarted.md', rerender);
  module.hot.accept('./CreateNumberMask/CreateNumberMask.jsx', rerender);
  module.hot.accept('./CreateNumberMask/CreateNumberMask.md', rerender);
  module.hot.accept('./MoreExamples/MoreExamples.jsx', rerender);
  module.hot.accept('./MoreExamples/MoreExamples.md', rerender);
}

render();
