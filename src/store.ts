import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./services/pokemon";
import pokemonReducer from "./redux/pokemonSlice";
import userReducer from "./redux/userSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    user: userReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
