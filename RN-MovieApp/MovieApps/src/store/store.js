// store
// adalah tempat penyimpanan
import {createStore} from "redux";
import {allReducers} from './allReducers'




// reducer
// adalah tempat penyimpanan

// action
// cara kita connect ke redux

export const store = createStore(allReducers);
