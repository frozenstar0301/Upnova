import { configureStore } from '@reduxjs/toolkit';
import stylesReducer from './stylesSlice';

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    styles: stylesReducer,
  },
});

export default store;
