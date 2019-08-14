import { 
  createStore, 
  combineReducers, 
  applyMiddleware, 
  compose
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import productReducer from '../reducers/productReducer';
import basketReducer from '../reducers/basketReducer';
import authReducer from '../reducers/authReducer';
import profileReducer from '../reducers/profileReducer';
import filterReducer from '../reducers/filterReducer';
import userReducer from '../reducers/userReducer';
import appReducer from '../reducers/appReducer';

import rootSaga from '../sagas/rootSaga';

const middleWare = store => next => (action) => {
  console.log(store.getState());
  next(action);
};

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      products: productReducer,
      basket: basketReducer,
      auth: authReducer,
      profile: profileReducer,
      filter: filterReducer,
      users: userReducer,
      app: appReducer
    }),
    composeEnhancer(applyMiddleware(middleWare, sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
