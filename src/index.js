import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider  loading= {null} store={store}>
      <PersistGate persistor= {persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/**
<Provider store={store}>:
          The <Provider> component is typically associated with the React-Redux library, and it's used to provide the Redux store to the entire application. 
This allows all components in your app to access the Redux store and its state.
-store: The store prop is used to specify the Redux store that you want to make available to the components within the provider. 
In this case, it's set to the store you created earlier, which is the Redux store where your application's state is managed.

<PersistGate persistor={persistor}>:
          The <PersistGate> component is part of Redux-Persist and is used to control the rehydration of the persisted state before rendering your application.
persistor: The persistor prop is used to specify the Redux-Persist persistor that manages the state persistence. It's the persistor you created earlier using persistStore. 
The PersistGate ensures that your application waits for the persisted state to be rehydrated before rendering, preventing any potential issues related to using the state before it's fully loaded.
 */