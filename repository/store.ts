import { configureStore } from '@reduxjs/toolkit'
import { postItsReducer } from './postIts'

export const store = configureStore({
  reducer: {
    postIts: postItsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
