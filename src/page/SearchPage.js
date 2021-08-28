import React, {useContext} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Container} from "react-bootstrap";
import {addRepository,  nullRepository, sortRepository} from "../features/reducers/repositorySlice";
import ReposItem from "../components/ReposItem";
import {addWord} from "../features/reducers/searchWordSlice";
import {increment, zeroing} from "../features/reducers/countSlice";
import ThemeTogglerButton from "../components/ThemeTogglerButton";
import {ThemeContext} from "../features/context/theme-context";


const SearchPage = () => {

    const count = useSelector(state => state.count.value);
    const reposList = useSelector(state => state.repository.list);
    const searchWord = useSelector(state => state.words.word);
    const dispatch = useDispatch();

    const theme = useContext(ThemeContext);
    console.log(theme.theme.background)


    function handleChange(e) {
        let sortBy = e.target.value;
        let q = [...reposList]

        if(sortBy==='date') {dispatch(sortRepository(q.sort(function (a, b) {
            if (a.created_at > b.created_at) return 1;
            if (a.created_at < b.created_at) return -1;
            return 0;
        })))}
        else if(sortBy==='rating') {dispatch(sortRepository(q.sort(function (a, b) {
            if (a.stargazers_count < b.stargazers_count) return 1;
            if (a.stargazers_count > b.stargazers_count) return -1;
            return 0;
        })))}
        else {dispatch(sortRepository(q.sort(function (a, b) {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
        })))}
    }

    function handleSearch  (e) {
        e?.preventDefault();
        if(!searchWord ) return;
        dispatch(increment())

        fetch(
            `https://api.github.com/search/repositories?q=${searchWord}&sort=stars&order=des&page=${count}`,
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
            .then(response => response.json())
            .then(items => {
                (items.items.length > 0)?
                dispatch(addRepository(items.items)):
                    dispatch(nullRepository())
                console.log("LOAD")
            })
            .catch(err => {
                console.log(err)
                }
            );
    }

    return (
        <div className='px-5 d-flex flex-column justify-content-start ' style={{ minHeight: '100vh',  backgroundColor: theme.theme.background, color: theme.theme.foreground}}>
            <div className='d-flex flex-row justify-content-between '>

                <ThemeTogglerButton/>

                <button   onClick={() => {
                    console.log(JSON.parse(localStorage.getItem('repo')))
                }}
                        className='my-2 shadow rounded'
                style={{backgroundColor: theme.theme.background, color: theme.theme.foreground, borderColor: theme.theme.background === '#222222'? theme.theme.foreground: 'none'}}>
                    view favorite in console
                </button>

            </div>

            <Container className='border p-3  row mx-auto  mb-2  rounded' >
                <h4 className='text-center fw-bold mb-4  col-sm-12'>SEARCH REPOSITORIES BY NAME</h4>
                <Form className='col-sm-12  align-items-center text-center my-3' onSubmit={(e)=> {
                    handleSearch(e);
                    dispatch(nullRepository());
                }}>
                    <div className='row justify-content-sm-center '>
                        <div className='col-sm-12'>ENTER SEARCH WORD: </div>
                        <input className=' my-sm-3  col-sm-5 col-lg-4' type='text' value={searchWord} onChange={(e)=> {
                            dispatch(addWord(e.target.value));
                            dispatch(zeroing());
                        }}  />
                        <Button variant='outline-success' className='col-sm-3 col-lg-2 fw-bold my-sm-3' onClick={()=> {
                            handleSearch();
                            dispatch(nullRepository());
                        }}>go to page {count}</Button>

                    </div>
                    <div className='row justify-content-sm-center'>

                    </div>

                </Form>
                {(reposList.length>0)&&<form className='row justify-content-center align-items-center'>
                    <div className='col-sm-3 col-lg-2 col-xl-1'>SORTING</div>
                    <select className='p-2 col-sm-4 col-lg-3 col-xl-2' variant="secondary" onChange={handleChange}>
                        <option value="rating">by rating</option>
                        <option value="name">by name</option>
                        <option value="date">date</option>
                    </select>
                </form>}
            </Container>

            <Container className=''>
                {(!reposList)? <div className='text-center text-danger'>SEARCH FAILED</div> :
                    reposList.map(repos=>
                    <ReposItem key={repos.id} repos={repos}/>
                )}
            </Container>
            {(reposList.length>0)&&<div className='d-flex justify-content-center'>
                <Button variant="secondary" onClick={handleSearch}
                        className='w-25 mt-2 mb-5'>
                    load {count} page
                </Button>
            </div>}

        </div>


    );
};

export default SearchPage;


