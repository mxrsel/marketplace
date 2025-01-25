import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import {usersReducer} from "../store/slice/usersSlice.ts";
import { itemsReducer } from '../store/slice/itemsSlice.ts';
import { categoriesReducer } from '../store/slice/categoriesSlice.ts';


const usersPersistConfig = {
    key: 'store:users',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    users: persistReducer(usersPersistConfig, usersReducer),
    items: itemsReducer,
    categories: categoriesReducer,

});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);