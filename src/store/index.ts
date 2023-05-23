import {
  configureStore,
  combineReducers,
  AnyAction,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
// import storage from "redux-persist/lib/storage";
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { useDispatch } from "react-redux";
import { StoreState } from "models/store";
import errorReducer from "store/errorSlice";
import userReducer from "store/userSlice";


export const rootReducer = combineReducers<StoreState.All, AnyAction>({
  user: userReducer,
  errors: errorReducer,
});
// export const rootReducer = combineReducers({
//   errors: errorReducer,
// });

const createNoopStorage = () => {
  return {
     getItem(_key: any) {
        return Promise.resolve(null);
     },
     setItem(_key: any, value: any) {
        return Promise.resolve(value);
     },
     removeItem(_key: any) {
        return Promise.resolve();
     },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
  key: "pexbit-root",
  storage,
  blacklist: ["errors", "ui", "metamask", "actions", "review"],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer: any = persistReducer<RootState>(
  rootPersistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
