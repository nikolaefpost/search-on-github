import React from 'react';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {useSelector} from "react-redux";
import { useParams} from 'react-router-dom'



const RepositoryPage = () => {

    const reposList = useSelector(state => state.list);
    const {id} = useParams();
    const repository = reposList.filter(item => item.id === Number(id))[0];

    function handleClick(url) { window.open(url)}

    return (
        <div className='d-flex justify-content-center  w-100' style={{marginTop: "10vh"}}>
            <Card  className='shadow '>
                <Card.Img className='p-2' variant="top" src={repository.owner.avatar_url}/>
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
                    <Card.Link style={{cursor: 'pointer'}} onClick={()=>handleClick(repository.html_url)}>Repository Link</Card.Link>
                </Card.Body>
            </Card>
            
        </div>
    );
};

export default RepositoryPage;