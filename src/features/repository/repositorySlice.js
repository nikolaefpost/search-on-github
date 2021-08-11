import { createSlice } from '@reduxjs/toolkit'

export const repositorySlice = createSlice({
    name: 'repository',
    initialState: {
        list: [],
    },
    reducers: {
        addFavorite: (state, action) => {
            const { id } = action.payload
            const favoriteRepos = state.list.find(item => item.id === id)
            if (favoriteRepos) {
                favoriteRepos.isFavorite = favoriteRepos.isFavorite?  false : true
            }
        },
        addRepository: (state, action) => {
            state.list.push(...action.payload)
        },
        sortRepository: (state, action) => {
            state.list=action.payload
        },
        nullRepository: (state) => {
            state.list = null
        },
    },
})


export const {sortRepository,  addFavorite, addRepository, nullRepository } = repositorySlice.actions

export default repositorySlice.reducer
