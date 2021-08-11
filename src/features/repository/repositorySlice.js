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
                favoriteRepos.isFavorite = true
            }
        },
        addRepository: (state, action) => {
            state.list.push(...action.payload)
            // state.push(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const {  addFavorite, addRepository } = repositorySlice.actions

export default repositorySlice.reducer
