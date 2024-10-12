import { configureStore } from '@reduxjs/toolkit'
import  authReducer  from '../features/user/user'

export default configureStore({
  reducer: {
    auth:authReducer
  }
})