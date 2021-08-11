import React from 'react';
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {useSelector} from "react-redux";
import { useHistory, useParams} from 'react-router-dom'



const RepositoryPage = () => {
    const history = useHistory();
    const reposList = useSelector(state => state.list);
    console.log(reposList)

    const {id} = useParams();


    const repository = reposList.filter(item => item.id == id)[0];
    // const [repository, setRepository] = useState();





    console.log(repository)
    function handleClick(url) {
        window.open(url);
    }

    return (
        <div className='d-flex justify-content-center mt-5'>
            <Card style={{ width: '25%' }}>
                <Card.Img variant="top" src={repository.owner.avatar_url}/>
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
                    <Card.Link  onClick={()=>handleClick(repository.html_url)}>Repository Link</Card.Link>
                </Card.Body>
            </Card>
            
        </div>
    );
};

export default RepositoryPage;