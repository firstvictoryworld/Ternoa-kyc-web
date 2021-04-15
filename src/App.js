import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { config as i18nextConfig } from './translations';

import reducers from './redux/reducers';
import AppRoutes from './router';

i18n.init(i18nextConfig);

const middlewares = [thunk];
const store = createStore(
    reducers,
    compose(applyMiddleware(...middlewares))
);

function App() {
  return (
    <Provider store={store}>
    	<I18nextProvider i18n={i18n}>
        	<AppRoutes />        
        </I18nextProvider>
    </Provider>
  );
}

export default App;
