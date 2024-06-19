import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './reducers/courseReducer';

const store = configureStore({
  reducer: {
    course: courseReducer,
  },
});

export default store;
