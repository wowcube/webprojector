import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { rootReducer, initialState } from './reducers'
import reportWebVitals from './reportWebVitals';
import App from './App'

import './assets/css/pace.min.css'
// import * as pace from  './assets/js/pace.min.js'
import './assets/css/bootstrap.min.css'
import './assets/css/icons.css'
import './assets/css/app.css'




const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
