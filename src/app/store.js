import { configureStore } from '@reduxjs/toolkit';
import repositoryReducer from '../features/reducers/repositorySlice'
import wordReducer from '../features/reducers/searchWordSlice'
import countReducer from '../features/reducers/countSlice'


export default configureStore({
    reducer: {
        repository: repositoryReducer,
        words: wordReducer,
        count: countReducer
    }
})

