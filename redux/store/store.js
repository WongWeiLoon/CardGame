import {createStore, combineReducers} from 'redux';
import cardReducer from '../reducers/cardReducer';

const rootReducer = combineReducers({card: cardReducer});

export const store = createStore(rootReducer);
