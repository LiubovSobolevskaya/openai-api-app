import { createStore } from 'redux';
import contentReducer from './reducers';

const store = createStore(contentReducer);
export default store; 