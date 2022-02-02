import { createSlice } from '@reduxjs/toolkit'
import {fetchRepos} from "../../app/action_creators/repositories";

export const repositorySlice = createSlice({
    name: 'repository',
    initialState: {
        list: [],
        status: null,
        error: null
    },
    reducers: {
        addFavorite: (state, action) => {
            const { id } = action.payload
            const favoriteRepos = state.list.find(item => item.id === id)
            if (favoriteRepos) {
                favoriteRepos.isFavorite = favoriteRepos.isFavorite?  false : true
            }
        },
        sortRepository: (state, action) => {
            console.log(action)
            state.list = action.payload
        },
        nullRepository: (state) => {
            state.list = []
        },
    },
    extraReducers: {
        [fetchRepos.pending]: (state) =>{
            state.status = 'loading';
            state.error = null;
        },
        [fetchRepos.fulfilled]: (state, action) =>{
            state.status = 'resolved';
            state.list = action.payload.items
        },
        [fetchRepos.rejected]: (state, action) =>{
            console.log(action.payload)
            state.status = 'rejected';
            state.error = action.payload;
        },
    }
})


export const {sortRepository,  addFavorite, addRepository, nullRepository } = repositorySlice.actions

export default repositorySlice.reducer
