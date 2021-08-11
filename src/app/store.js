import { configureStore } from '@reduxjs/toolkit';
import repositoryReducer from '../features/repository/repositorySlice'

export default configureStore({
    reducer: repositoryReducer,
})