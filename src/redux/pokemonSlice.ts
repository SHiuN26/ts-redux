import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pokemonApi } from "../services/pokemon";
interface PokemonState {
  favorites: string[];
  error: string | null;
  errorMessage: string | null;
}

const initialState: PokemonState = {
  favorites: [],
  error: null,
  errorMessage: null,
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (name) => name !== action.payload
      );
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     pokemonApi.endpoints.getPokemonByName.matchRejected,
  //     (state, action) => {
  //       const errorMessage = action.error.message || "An error occurred";
  //       state.error = errorMessage;
  //     }
  //   );
  // },
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonApi.endpoints.getPokemonByName.matchRejected,
      (state, action) => {
        console.log("action.payload", action.payload);
        const errorResponse = action.payload?.data as { error?: string };
        const errorMessage = errorResponse?.error || "An error occurred";
        state.error = errorMessage;
        state.errorMessage = errorMessage;
        console.log(state.errorMessage);
      }
    );
  },
});

export const { addFavorite, removeFavorite } = pokemonSlice.actions;

export default pokemonSlice.reducer;
