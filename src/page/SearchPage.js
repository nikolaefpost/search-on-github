import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Container, Row} from "react-bootstrap";
import {addRepository} from "../features/repository/repositorySlice";
import ReposItem from "../components/ReposItem";


const SearchPage = () => {
    let inputLogin;


    const reposList = useSelector(state => state.list);
    const dispatch = useDispatch()
    console.log(reposList)
    function handleSubmit  (e) {
        if(!inputLogin.value) return;
        e.preventDefault();

        fetch(
            `https://api.github.com/users/${inputLogin.value}/repos`,
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
                // body: JSON.stringify(request)
            })
            .then(response => response.json())
            .then(items => {
                console.log(items)
                dispatch(addRepository(items))
                console.log("LOAD")
            })
            .catch(err => {
                console.log(err)
                }
            );

    }



    return (
        <Container>
            <h4 className='text-center mt-5'>Search repositories by login</h4>
            <Form onSubmit={handleSubmit} className='d-flex align-items-center justify-content-center my-5'>

                <div className='mr-2'>ENTER LOGIN: </div>
                <input className='mr-2 p-1' type='text' ref={node => {inputLogin = node;}} />
                <Button variant='outline-success' type="submit">GO</Button>

            </Form>
            <Container className=''>
                {reposList.map(repos=>
                    <ReposItem key={repos.id} repos={repos}/>
                )}
            </Container>
        </Container>


    );
};

export default SearchPage;


// class AllModels extends React.Component {
//     constructor() {
//         super();
//
//         this.state = {
//             valueLogin: '',
//             valueRepos: ''
//         }
//     }
//
//     doRead() {
//
//
//         fetch(
//             `https://api.github.com/users/${this.state.valueLogin}/${this.state.valueRepos}`,
//             {
//                 method: 'GET',
//                 cache: 'no-cache',
//                 // mode: 'no-cors',
//                 credentials: 'same-origin',
//                 headers: {
//                     // 'Content-Type': 'application/json',
//                     // 'X-Requested-With': 'XMLHttpRequest'
//                 },
//                 redirect: 'follow',
//                 referrerPolicy: 'no-referrer',
//                 // body: JSON.stringify(request)
//             })
//             .then(response => response.json())
//             .then(items => {
//                 this.setState(
//                     {
//                         isLoaded: true,
//                         items: items
//
//                     }
//                 )
//                 console.log(items)
//             })
//             .catch(err => {
//                     this.setState(
//                         {
//                             error: err
//                         })
//                 }
//             );
//     }
//
//     componentDidMount() {
//         this.doRead();
//         console.log('я создан и примонтирован')
//     }
//
//     render() {
//         if (this.state.error) return this.renderErorr()
//         else if (this.state.isLoaded) return this.renderItems()
//         return (
//             <div> preloader</div>
//         )
//     }
//
//     renderItems() {
//         return (
//             <ul id='areaList' className='row'>{
//                 this.state.items.map(item => (
//                         <li key={item.id} className='col-3 list-group-item' >
//                             <AllModelsItem item={item}></AllModelsItem>
//                         </li>
//
//                     )
//                 )
//             }
//
//             </ul>
//         )
//     }
//
//     renderErorr() {
//         return (
//             <div>Error :{this.state.error.message()} </div>
//         )
//     }
// }
//
// // export default AllModels;