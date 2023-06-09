// react
import { configureStore } from '@reduxjs/toolkit';
// reducers
import { themeReducer } from '../theme';
import { loaderReducer } from '../loader';
import { notificationReducer } from '../notification';
// modules reducers

// configure redux store
export const store = configureStore({
    reducer: {
        theme: themeReducer,
        loader: loaderReducer,
        notification: notificationReducer,
        // modules reducers
    },
});
