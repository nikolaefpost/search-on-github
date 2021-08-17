import React from 'react';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {useSelector} from "react-redux";
import { useParams, useHistory} from 'react-router-dom'
import {SEARCH_ROUTE} from "../utils/consts";


const RepositoryPage = () => {

    const {id} = useParams();

    const history = useHistory();
    const reposList = useSelector(state => state.repository.list);
    if (reposList.length<1) {
        history.push(SEARCH_ROUTE);
        return null;
    }


    const repository = reposList.filter(item => item.id === Number(id))[0];

    function handleClick(url) { window.open(url)}

    return (
        <div className='d-flex justify-content-center  ' style={{marginTop: "50px", width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
            <Card className='shadow '>
                <Card.Img className='p-2' style={{width: '500'}} variant="top" src={repository.owner.avatar_url}/>
                <Card.Body>
                    <Card.Title>Login: {repository.owner.login}</Card.Title>
                    <Card.Title>Repository: {repository.name}</Card.Title>
                    <Card.Text>Description: {repository.description}</Card.Text>

                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Created at: {new Date(repository.created_at).toLocaleDateString()}</ListGroupItem>
                    <ListGroupItem>Updated at: {new Date(repository.updated_at).toLocaleDateString()}</ListGroupItem>
                    <ListGroupItem>Language: {repository.language}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Card.Link style={{cursor: 'pointer'}} onClick={() => handleClick(repository.html_url)}>Repository
                        Link</Card.Link>
                </Card.Body>
            </Card>

        </div>
    );
};

export default RepositoryPage;