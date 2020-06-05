import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/login/loginSlice';
import listReducer from '../features/list/listSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    list: listReducer
  },
});
