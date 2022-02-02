import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchRepos = createAsyncThunk(
    'repository/fetchRepos',
    async function (arg, {rejectWithValue}) {
        try {
            const response = await fetch(`https://api.github.com/search/repositories?q=${arg[0]}&sort=stars&order=des&page=${arg[1]}`,
                {
                    method: 'GET',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                })
            if (!response.ok) throw new Error(response.status.toString())
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message)
        }


    }
)
