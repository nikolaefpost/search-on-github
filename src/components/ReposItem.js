import React from 'react';
import {useHistory} from 'react-router-dom'
import {REPOS_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {addFavorite} from "../features/repository/repositorySlice";
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
                    <img className='col-sm-3 img-thumbnail' src={props.repos.owner.avatar_url} alt='device' width={64} height={64}  />
                    <div className='col-sm-9'>
                        <div className='row justify-content-between'>
                            <div className='col-sm-10'>{props.repos.owner.login}</div>
                            <div className='col-sm-2'>{props.repos.stargazers_count} <i className="bi bi-star"></i></div>

                            <div className='col-sm-12'>{props.repos.full_name}</div>


                        </div>
                        <div className='row p-2 justify-content-between'>
                            <Button variant={'outline-light'} onClick={() => {history.push(REPOS_ROUTE + '/' + props.repos.id)}}
                                    className=' col-sm-4'>
                                view more
                            </Button>
                            <div className='col-sm-1 text-right align-self-center' onClick={handleClick}>
                                {props.repos.isFavorite?
                                    <i className="bi bi-heart-fill" style={{color: 'red'}}></i>:
                                    <i className="bi bi-heart"></i>
                                }
                            </div>
                        </div>
                    </div>


                </div>
            </div>
    );
};

export default ReposItem;