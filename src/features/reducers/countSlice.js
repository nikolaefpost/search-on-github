import { createSlice } from '@reduxjs/toolkit'

export const countSlice = createSlice({
    name: 'count',
    initialState: {
        value: 1,
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        zeroing: state => {
            state.value = 1
        }
    },
})

export const {increment, decrement, zeroing} = countSlice.actions

export default countSlice.reducer