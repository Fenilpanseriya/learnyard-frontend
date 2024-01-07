import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux"
import {persistor, store} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>

    <PersistGate loading={null} persistor={persistor}>
    <ChakraProvider theme={theme}>
      <ColorModeScript/>
      <App/>
    </ChakraProvider>
    </PersistGate>
    </Provider>
  </StrictMode>
);

