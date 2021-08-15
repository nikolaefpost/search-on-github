import React from 'react';
import {useHistory} from 'react-router-dom'
import {REPOS_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {addFavorite} from "../features/reducers/repositorySlice";
import {useDispatch} from "react-redux";


const ReposItem = (props) => {

    const dispatch = useDispatch()
    const history = useHistory();

    function handleClick() {
        dispatch(addFavorite({id: props.repos.id}))
        let q = JSON.parse(localStorage.getItem('repo'))
        if(!q) q=[];
        let select =(q.length>0)? q.filter(item => item.id !== props.repos.id):[];
        (q.length === select.length)?  q.push(props.repos): q=select
        localStorage.setItem('repo', JSON.stringify(q));
    }

    return (<div>
                <div className='text-light bg-secondary row  align-items-center mb-2 rounded ' >
                    <img className='col-sm-3 col-lg-2 col-xl-1 img-thumbnail ' src={props.repos.owner.avatar_url} alt='device' width={64} height={64}  />
                    <div className='col-sm-9 col-lg-10 col-xl-11 '>
                        <div className='row flex-xxl-nowrap justify-content-between justify-content-xxl-start  px-sm-2 px-md-4 pt-lg-2 '>
                            <div className='col-sm-9 col-xl-2 align-self-xl-center'>login: <span className='fw-bolder'>{props.repos.owner.login}</span> </div>
                            <div className='col-sm-3 col-xl-1 text-end align-self-xl-center'>{props.repos.stargazers_count} <i className="bi bi-star"></i></div>

                            <div className='col-sm-12 col-xl-5 align-self-xl-center xl'>repo: <span className='fw-bolder'>{props.repos.full_name}</span></div>
                            <Button variant={'outline-light'} onClick={() => {history.push(REPOS_ROUTE + '/' + props.repos.id)}}
                                    className=' col-sm-4 col-xl-2 mt-sm-2 mt-xl-0'>
                                view more
                            </Button>
                            <div className='col-sm-1 col-xl-1 text-right align-self-center mx-sm-2 text-end' onClick={handleClick}>
                                {props.repos.isFavorite?
                                    <i className="bi bi-heart-fill" style={{color: 'red'}}></i>:
                                    <i className="bi bi-heart"></i>
                                }
                            </div>


                        </div>
                        {/*<div className='row p-sm-2 p-md-4 p-xxl-2 justify-content-between justify-content-xxl-start'>*/}
                        {/*    */}
                        {/*</div>*/}
                    </div>


                </div>
            </div>
    );
};

export default ReposItem;