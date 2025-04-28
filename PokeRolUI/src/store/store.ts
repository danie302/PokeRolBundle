import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import userReducer from './users/user';
import pokemonReducer from './pokemons/pokemon';
import teamReducer from './teams/teams';

// Create a store
export const store = configureStore({
  reducer: {
    user: userReducer,
    pokemon: pokemonReducer,
    teams: teamReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Dispatch and Selector with types
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()