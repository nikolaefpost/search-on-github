import React, {useContext, useEffect, useState} from 'react';
import {Button, Card} from "react-bootstrap";
import {useSelector} from "react-redux";
import {useParams, useHistory} from 'react-router-dom'
import {SEARCH_ROUTE} from "../utils/consts";
import {ThemeContext} from "../features/context/theme-context";
import ThemeTogglerButton from "../components/ThemeTogglerButton";


const RepositoryPage = () => {
    const [size, setSize] = useState(window.innerWidth);
    const updateWindowWidth = () => setSize(window.innerWidth)

    useEffect(()=>{
        window.addEventListener('resize', updateWindowWidth)
        return () => window.removeEventListener('resize', updateWindowWidth)
    })

    const {id} = useParams();
    const theme = useContext(ThemeContext);
    let themeCard = theme.theme.background === '#eeeeee' ? 'light' : 'dark';

    const history = useHistory();
    const reposList = useSelector(state => state.repository.list);

    const repository = reposList.filter(item => item.id === Number(id))[0];

    const handleClick = (url) => window.open(url)

    return (<div className='px-5' style={{minHeight: '100vh', backgroundColor: theme.theme.background, color: theme.theme.foreground}}>
            <ThemeTogglerButton/>
            <div className='d-flex flex-column justify-content-center align-items-center p-5'>


                <Card className='shadow body' bg={themeCard} border='light' style={{ width: size < 576 ? '80vw': size < 992 ? '60vw': '40vw'  }}>
                    <Card.Img className='p-2' variant="top" src={repository.owner.avatar_url}/>
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
                    <Card.Footer className="text-muted text-center" >
                        <Button variant="primary" onClick={()=>history.push(SEARCH_ROUTE)} >
                            <i className="bi bi-chevron-double-left"></i>
                        </Button>{' '}
                    </Card.Footer>
                </Card>


            </div>
        </div>


    );
};

export default RepositoryPage;