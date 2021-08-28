import React, {useContext} from 'react';
import {Card} from "react-bootstrap";
import {useSelector} from "react-redux";
import { useParams, useHistory} from 'react-router-dom'
import {SEARCH_ROUTE} from "../utils/consts";
import {ThemeContext} from "../features/context/theme-context";
import ThemeTogglerButton from "../components/ThemeTogglerButton";


const RepositoryPage = () => {

    const {id} = useParams();
    const theme = useContext(ThemeContext);
    let themeCard = theme.theme.background === '#eeeeee'? 'light' :'dark';

    const history = useHistory();
    const reposList = useSelector(state => state.repository.list);
    if (reposList.length<1) {
        history.push(SEARCH_ROUTE);
        return null;
    }


    const repository = reposList.filter(item => item.id === Number(id))[0];

    function handleClick(url) { window.open(url)}

    return (
        <div className='d-flex flex-column justify-content-center align-items-center p-5'
             style={{ minHeight: '100vh',   backgroundColor: theme.theme.background, color: theme.theme.foreground}}>



                <Card className='shadow body' bg={themeCard} border='light' style={{ maxHeight: '100%',  }}>
                    <Card.Img className='p-2'  variant="top" src={repository.owner.avatar_url}/>
                    <Card.Body>
                        <Card.Title>Login: {repository.owner.login}</Card.Title>
                        <Card.Title>Repository: {repository.name}</Card.Title>

                        <Card.Text>Description: {repository.description}</Card.Text>
                        <Card.Text>Created at: {new Date(repository.created_at).toLocaleDateString()}</Card.Text>
                        <Card.Text>Updated at: {new Date(repository.updated_at).toLocaleDateString()}</Card.Text>
                        <Card.Text>Language: {repository.language}</Card.Text>

                        <Card.Link style={{cursor: 'pointer'}} onClick={() => handleClick(repository.html_url)}>Repository
                            Link</Card.Link>
                    </Card.Body>
                    <Card.Footer className="text-muted text-center"><ThemeTogglerButton /></Card.Footer>
                </Card>


        </div>

    );
};

export default RepositoryPage;