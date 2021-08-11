import React from 'react';
import {useHistory} from 'react-router-dom'
import {REPOS_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {addFavorite, addRepository} from "../features/repository/repositorySlice";
import {useDispatch} from "react-redux";

const ReposItem = (props) => {
    console.log(props.repos)
    const dispatch = useDispatch()
    const history = useHistory();
    return (
        <div className='text-light bg-secondary row  align-items-center mb-2 rounded ' >
            <img className='col-1 img-thumbnail' src={props.repos.owner.avatar_url} alt='device' width={64} height={64}  />
            <div className='col-2'>{props.repos.owner.login}</div>
            <div className='col-3'>{props.repos.full_name}</div>
            <div className='col-2'>{props.repos.stargazers_count} <i className="bi bi-star"></i></div>
            <Button variant={'outline-light'} onClick={() => {history.push(REPOS_ROUTE + '/' + props.repos.id)}}
                    className='ml-2 mr-4'>
                view more
            </Button>
            <Button variant={'outline-light'} onClick={() => dispatch(addFavorite({id: props.repos.id}))}
                    className='ml-2 mr-4'>
                add to favourites
            </Button>

            {/*<div className='col-2'>Статус доставки</div>*/}
            {/*{props.done? <input type='checkbox' checked className='col-1'/>: <input type='checkbox' className='col-1'/>*/}
            {/*}*/}
        </div>
    );
};

export default ReposItem;