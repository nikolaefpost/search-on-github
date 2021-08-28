import React, {useEffect, useState} from 'react';
import { Modal} from "react-bootstrap";


   const Greetings = () => {

       const [show, setShow] = useState(true);

       useEffect(() => {
           const timer = setTimeout(onHide, 1000);
           return () => clearTimeout(timer);
       });

       const onHide=()=>setShow( false)

        return (
            <Modal
                show={show}
                onHide={onHide}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-center">
                        Yemelyanov Eduard
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src='https://avatars.githubusercontent.com/u/72260364?v=4' alt='Yemelyanov'/>
                </Modal.Body>

            </Modal>
        );
    };

export default Greetings