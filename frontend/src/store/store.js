import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  // 다른 리듀서를 추가할 수 있습니다.
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
