import { configureStore } from '@reduxjs/toolkit'
import countreduce from './dataslice'
import userreducer from './authsuerslice';

const store = configureStore({
  reducer: {
    counter: countreduce,
    loginuser:userreducer
  },
})
export default store;