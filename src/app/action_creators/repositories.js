import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchRepos = createAsyncThunk(
    'repository/fetchRepos',
    async function(searchWord, count){
            console.log(searchWord)
        const response = await fetch(`https://api.github.com/search/repositories?q=${searchWord}&sort=stars&order=des&page=${count}`,
            {
                method: 'GET',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    // 'Content-Type': 'application/json',
                    // 'X-Requested-With': 'XMLHttpRequest'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            })
        const data = await response.json();
            console.log(data)
        return data;
    }
)
