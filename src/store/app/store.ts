import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";
import documentReducer from "../features/document/documentSlice";
import { postApi } from "../services/post";
// import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import persistStore from "redux-persist/es/persistStore";
import { photosApi } from "../services/photos";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";

const persistConfig = {
  key: "root",
  storage: createIdbStorage({ name: "myApp", storeName: "keyval" }),
  whitelist: ["users", "documents"],
};

const reducers = combineReducers({
  counter: counterReducer,
  users: userReducer,
  documents: documentReducer,
  [postApi.reducerPath]: postApi.reducer,
  [photosApi.reducerPath]: photosApi.reducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([postApi.middleware]),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
