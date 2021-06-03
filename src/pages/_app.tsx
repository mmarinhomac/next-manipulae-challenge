import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import store from '../store';

import GlobalStyle from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
        <GlobalStyle />
    </Provider>
  );
}

export default MyApp
