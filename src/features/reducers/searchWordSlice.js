import { createSlice } from '@reduxjs/toolkit'

export const searchWordSlice = createSlice({
    name: 'words',
    initialState: {
        word: '',
    },
    reducers: {

        addWord: (state, action) => {
            state.word=action.payload
        },

    },
})


export const {addWord} = searchWordSlice.actions

export default searchWordSlice.reducer
