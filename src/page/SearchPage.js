import React, {useContext} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Container, Spinner} from "react-bootstrap";
import {nullRepository, sortRepository} from "../features/reducers/repositorySlice";
import ReposItem from "../components/ReposItem";
import {addWord} from "../features/reducers/searchWordSlice";
import {increment, decrement, zeroing} from "../features/reducers/countSlice";
import ThemeTogglerButton from "../components/ThemeTogglerButton";
import {ThemeContext} from "../features/context/theme-context";
import {fetchRepos} from "../app/action_creators/repositories";


const SearchPage = () => {

    const count = useSelector(state => state.count.value);
    console.log(count )
    const {list, error, status} = useSelector(state => state.repository);
    const searchWord = useSelector(state => state.words.word);
    const dispatch = useDispatch();

    const theme = useContext(ThemeContext);

    function handleChange(e) {
        let sortBy = e.target.value;
        let q = [...list]

        if (sortBy === 'date') {
            dispatch(sortRepository(q.sort(function (a, b) {
                if (a.created_at > b.created_at) return 1;
                if (a.created_at < b.created_at) return -1;
                return 0;
            })))
        } else if (sortBy === 'rating') {
            dispatch(sortRepository(q.sort(function (a, b) {
                if (a.stargazers_count < b.stargazers_count) return 1;
                if (a.stargazers_count > b.stargazers_count) return -1;
                return 0;
            })))
        } else {
            dispatch(sortRepository(q.sort(function (a, b) {
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                return 0;
            })))
        }
    }

    const enterSearch = (e) => {
        e?.preventDefault();
        if (!searchWord) return;
        dispatch(increment())
        dispatch(fetchRepos([searchWord, count]))
    }
    const forward = () => {
        dispatch(increment())
        dispatch(fetchRepos([searchWord, count]))
    }
    const back = () => {
        dispatch(decrement())
        dispatch(fetchRepos([searchWord, count]))
    }

    return (
        <div className='px-5 d-flex flex-column justify-content-start '
             style={{minHeight: '100vh', backgroundColor: theme.theme.background, color: theme.theme.foreground}}>
            <div className='d-flex flex-row justify-content-between '>

                <ThemeTogglerButton/>

                <button onClick={() => {
                    console.log(JSON.parse(localStorage.getItem('repo')))
                }}
                        className='my-2 shadow rounded'
                        style={{
                            backgroundColor: theme.theme.background,
                            color: theme.theme.foreground,
                            borderColor: theme.theme.background === '#222222' ? theme.theme.foreground : 'none'
                        }}>
                    view favorite in console
                </button>


            </div>

            <Container className='border p-3  row mx-auto  mb-2  rounded'>
                <h4 className='text-center fw-bold mb-4  col-sm-12'>SEARCH REPOSITORIES BY NAME</h4>
                <Form className='col-sm-12  align-items-center text-center my-3' onSubmit={enterSearch}>
                    <div className='flex-column justify-content-center '>
                        <div className='col-sm-12'>ENTER SEARCH WORD:</div>

                        <input className=' my-sm-3  col-sm-5 col-lg-4' type='text' value={searchWord} onChange={(e) => {
                            dispatch(addWord(e.target.value));
                            dispatch(zeroing());
                        }}/>
                        <div className='row justify-content-center my-2'>
                            {count > 2 &&
                                <Button variant='outline-primary' className='col-12 col-sm-5 col-lg-2 fw-bold me-0 me-sm-2'
                                        onClick={back}>
                                    <span>go to page {count - 2}</span>
                                </Button>}
                            <Button variant='outline-primary' className='col-12 mt-2 mt-sm-0 col-sm-5 col-lg-2 fw-bold'
                                    onClick={forward}>
                                <span>go to page {count}</span>
                            </Button>
                        </div>

                    </div>
                    <div className='row justify-content-sm-center'>

                    </div>
                    {status === 'loading' && <Spinner animation="border"/>}
                    {error && <h2>ERROR: {error}</h2>}
                </Form>

                {(list.length > 0) && <form className='row justify-content-center align-items-center'>
                    <div className='col-sm-3 col-lg-2 col-xl-1'>SORTING</div>
                    <select className='p-2 col-sm-4 col-lg-3 col-xl-2' variant="secondary" onChange={handleChange}>
                        <option value="rating">by rating</option>
                        <option value="name">by name</option>
                        <option value="date">date</option>
                    </select>
                </form>}
            </Container>

            <Container className=''>
                {(!list) ? <div className='text-center text-danger'>SEARCH FAILED</div> :
                    list.map(repos =>
                        <ReposItem key={repos.id} repos={repos}/>
                    )}
            </Container>
            {(list.length > 0) && <div className='d-flex justify-content-center'>
                <Button variant="primary" className='col-2 col-sm-1 my-sm-3 me-2' disabled={count<=2}
                        onClick={back}>
                    <i className="bi bi-chevron-double-left"></i>
                </Button>
                <Button variant="primary" className='col-2 col-sm-1 my-sm-3' onClick={forward}>
                    <i className="bi bi-chevron-double-right"></i>
                </Button>
            </div>}

        </div>


    );
};

export default SearchPage;


