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
                    <img className='col-1 img-thumbnail' src={props.repos.owner.avatar_url} alt='device' width={64} height={64}  />
                    <div className='col-2'>{props.repos.owner.login}</div>
                    <div className='col-4'>{props.repos.full_name}</div>
                    <div className='col-2'>{props.repos.stargazers_count} <i className="bi bi-star"></i></div>
                    <Button variant={'outline-light'} onClick={() => {history.push(REPOS_ROUTE + '/' + props.repos.id)}}
                            className='ml-2 mr-4 '>
                        view more
                    </Button>
                    <div className='col-1 text-right' onClick={handleClick}>
                        {props.repos.isFavorite?
                            <i className="bi bi-heart-fill" style={{color: 'red'}}></i>:
                            <i className="bi bi-heart"></i>
                        }
                    </div>
                </div>
            </div>
    );
};

export default ReposItem;