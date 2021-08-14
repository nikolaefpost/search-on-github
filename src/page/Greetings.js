import React, {useEffect} from 'react';
import { Modal} from "react-bootstrap";


   const Greetings = ({show, onHide}) => {

       useEffect(() => {
           const timer = setTimeout(onHide, 1000);
           return () => clearTimeout(timer);
       });

        return (
            <Modal
                show={show}
                onHide={onHide}
                centered
                style={{width:'100%'}}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-center">
                        Емельянов Эдуард
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src='https://avatars.githubusercontent.com/u/72260364?v=4' alt='Yemelyanov'/>
                </Modal.Body>

            </Modal>
        );
    };

export default Greetings