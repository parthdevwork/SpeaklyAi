import { configureStore } from '@reduxjs/toolkit'
import examReducer from '../redux/fullExam/examSlice'

export const store = configureStore({
  reducer: {
    exam:examReducer
  },
})


