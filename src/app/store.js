import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import listReducer from '../features/list/listSlice';
import detailsReducer from '../features/details/detailsSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    list: listReducer,
    details: detailsReducer
  },
});
